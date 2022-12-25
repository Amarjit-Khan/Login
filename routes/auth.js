const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator'); // To verify each input
var bcrypt = require('bcryptjs');                                // For hashing and salting passwords
const jwt = require('jsonwebtoken')                              // Token for each user who logged in
const fetch = require('../middleware/fetch')                     // Middleware to verify jwt

const JWT_SECRET = 'Marcosisagoodb$oy'

//Route 1 -- Sign-In -- "http://localhost:5000/api/auth/signin"
router.post('/signin', [
    body('username', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain atleast 3 characters').isLength({ min: 3 }),
    body('pin', 'Pin must contain only 4 numbers').isLength(4)
], async (req, res) => {
    const { username, email, password, pin } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((obj) => { return obj.msg }) });
    }

    try {
        const salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(password, salt)

        let user = await User.create({
            username: username,
            email: email,
            password: secPass,
            pin: pin
        })

        let data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Route 2 -- Login -- "http://localhost:5000/api/auth/login"
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 3 })
], async (req, res) => {
    let success = false;
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((obj) => { return obj.msg }) });
    }

    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Email does not exist" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)  //comapring pass with database

        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Incorrect password" })
        }

        let data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Route 3 -- Get data -- "http://localhost:5000/api/auth/getuser"
router.post('/getuser', fetch, async (req, res) => {
    try {
        let userId = req.user.id
        let user = await User.findById(userId)
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;