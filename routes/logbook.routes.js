// routes/logbook.routes.js
const express = require("express");
const router = express.Router();
const logbookSchema = require("../models/Logbook")
const mongoose = require('mongoose');

//Get the history of a user
router.route("/logbook/:userId").get((req, res, next)=>{
    
    const userId = req.params.userId;

    logbookSchema.find({user_id: userId}, (error, data) =>{
        if(error){
            return next(error);
        } else{
            res.status(200).json({
                message: "User history retrieved successfully",
                result: data,
            });
        }
    });
});

module.exports = router;
