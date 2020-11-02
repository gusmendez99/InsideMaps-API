const express = require("express");
const router = express.Router();
const errorReportSchema = require('../models/ErrorReport')
const userSchema = require("../models/User")
const authorize = require("../middlewares/auth")
const jwt = require('jsonwebtoken');

//Get all error reports
router.route("/error-report").get((req, res)=>{
    errorReportSchema.find(async (error, data) => {
        if(error){
            return next(error)
        } else {
            let errorData = data
            console.log(data)

            for(let i=0; i<data.length; i++) {
                let userFullName = "Invitado";
                const userData = await userSchema.findById({_id: errorData[i]._doc.user_id})
                if(userData && userData.username != "Invitado"){
                    userFullName = `${userData.firstname} ${userData.lastname} (${userData.username})`
                }
                errorData[i] = {...errorData[i]._doc, name: userFullName}
            }
            res.status(200).json(errorData)
        }
    })
})

//Get all error reports of a user
router.route("/error-report/:userId").get((req, res, next)=>{

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
router.post("/error-report/", authorize, (req, res, next) => {

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