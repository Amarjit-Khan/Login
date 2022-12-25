const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/login"

const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("We are connected bro");
    })
}

module.exports = connectToMongo;