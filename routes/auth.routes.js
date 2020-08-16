// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

//Admin SignUp pending...
const ADMIN_ROLE = 1;
const USER_ROLE = 2;

// Sign-up
router.post("/auth/signup",
    [
        check('firstname')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Firstname must be at least 3 characters long'),
        check('lastname')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Lastname must be at least 3 characters long'),
        check('username')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long'),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('role', 'Role is required')  //1 for normal users, 2 for admins
            .not()
            .isEmpty()
            .isNumeric(),
        check('gender', 'Gender is required')
            .not()
            .isEmpty()
            .isNumeric(),
        check('age', 'Age is required')
            .not()
            .isEmpty()
            .isNumeric(),
        check('password', 'Password should be between 5 to 20 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 20 })
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new userSchema({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    role: USER_ROLE,
                    age: req.body.age,
                    gender: req.body.gender,
                    email: req.body.email,
                    password: hash
                });
                user.save().then((response) => {
                    res.status(201).json({
                        message: "User successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            });
        }
    });


// Sign-in
router.post("/auth/signin", (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id,
            role: getUser.role,
        }, "secret-key", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});


module.exports = router;