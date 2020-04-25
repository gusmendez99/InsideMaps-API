// middlewares/auth.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //TODO: It needs to be stored on .env file
        jwt.verify(token, "secret-key");
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};