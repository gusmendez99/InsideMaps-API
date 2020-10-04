const express = require("express");
const router = express.Router();
const errorReportSchema = require('../models/ErrorReport')
const mongoose = require('mongoose');
const authorize = require("../middlewares/auth")
const jwt = require('jsonwebtoken');
const { response } = require("express");

//Get all error reports
router.route("/errorReport").get((req, res)=>{
    errorReportSchema.find((error, response) => {
        if(error){
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

//Get all error reports of a user
router.route("/errorReport/:userId").get((req, res, next)=>{

    const userId = req.params.userId;


    errorReportSchema.find({user_id: userId}, (error, data) => {
        if(error){
            return next(error)
        } else{
            res.status(200).json({
                message: "Users error Reports retrieved successfully",
                result: data,
            });
        }
    });
});

//Post an error report
router.post("/errorReport/", authorize, (req, res, next) => {

    const date = new Date();
    const token = req.get('Authorization').replace("JWT ","")
    const user_id = jwt.decode(token).userId
    const description = req.body.description

    const errorReport = new errorReportSchema({
        date,
        user_id,
        description
    });

    errorReport.save()
        .then((response) => {
            res.status(201).json({
                message: "Error Report successfully created",
                result: response,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error, 
            });
        });
});

module.exports = router