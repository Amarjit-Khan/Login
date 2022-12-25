
# Project Title

A Login Backend using NodeJS and MongoDB. 

Verifies each input using express-validator. 
Passwords are hashed and salted using bcryptjs.
JWT is used to create a token for each user.


## Packages

* express
* mongoose
* bcryptjs
* cors
* express-validator
* jsonwebtoken
* nodemon
## Installation & APIs

* Install Login with npm

```bash
  npm install Login
  cd Login
```
* Install MongoDB to local machine.
* Open terminal and start the mongo server
```bash
  mongod
```
* Create a database login and a table called users will be created.
* Start the backend server using the command
```bash
  npm i
  nodemon index.js
```
* APIs
```bash
  http://localhost:5000/api/auth/signin
  http://localhost:5000/api/auth/login
  http://localhost:5000/api/auth/getuser
```

## Author
https://github.com/Amarjit-Khan