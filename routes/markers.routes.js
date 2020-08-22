// routes/user.routes.js
const express = require("express");
const router = express.Router();
const markerSchema = require("../models/Markers");
const mapSchema = require("../models/Maps");
const authorize = require("../middlewares/auth");
const { request } = require("express");

// Get Markers
router.route("/markers/").get(authorize, (req, res) => {
  markerSchema.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

// Search Marker based on name, URI: /marker?name=MY_QUERY&map=MAP_ID
router.get("/marker", (req, res, next) => {

  mapSchema.findById(req.query.map, (error, data) => {
    if (error) {
      return next(error);
    } else {   
      // Checks if map exists
      if(data != null) {
        markerSchema.find({ "name" :  {'$regex': new RegExp(req.query.name, "i")}, 
              "map_id": req.query.map}, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.status(200).json({
              message: "Markers retrieved successfully",
              result: data,
            });
          }
        });
      } else {
        res.status(404).json({
          message: "Map does not exist"
        });
      }
    }
  });
  
});


//Create marker
router.post("/marker/", authorize, (req, res, next) => {
  console.log(req.body);
  const marker = new markerSchema({
    name: req.body.name,
    map_id: req.body.map_id,
    location: req.body.location 
  });
  marker.save()
    .then((response) => {
      res.status(201).json({
        message: "Marker successfully created!",
        result: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});



module.exports = router;