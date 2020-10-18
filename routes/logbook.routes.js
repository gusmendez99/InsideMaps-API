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

//Number of visits per local
router.route('/logbook/stats/most-visited').get((req, res, next) => {
    logbookSchema.aggregate().
        group({_id:'$destination_id', times_visited: {$sum: 1}}).
        exec(function(err, data) {
            if(err){
                return next(err);
            }else{
                res.status(200).json({
                    result: data
                })
            }
        })
})

//Number of visits on a month
router.route('/logbook/stats/visits-per-month').get((req, res, next) =>{
    logbookSchema.aggregate().
        group({_id:{'month':'$month','destination_id':'$destination_id'}, times_visited: {$sum: 1}}).
        exec(function(error, data){
            if(error){
                return next(error);
            }else{
                res.status(200).json({
                    result: data
                });
            }
        });
})

module.exports = router;
