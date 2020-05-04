// routes/user.routes.js
const express = require("express");
const router = express.Router();
const mapSchema = require("../models/Map");
const authorize = require("../middlewares/auth");


// Get Maps
//router.route('/user/').get(authorize, (req, res) ...
router.route('/map/').get((req, res) => {
    mapSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single User
router.route('/map/:id').get(authorize, (req, res, next) => {
    mapSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Update Map
router.route('/map/:id').put((req, res, next) => {
    mapSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Map successfully updated!')
        }
    })
})


// Delete Map
router.route('/map/:id').delete((req, res, next) => {
    mapSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;