// routes/user.routes.js
const express = require("express");
const router = express.Router();
const mapSchema = require("../models/Maps");
const markerSchema = require("../models/Markers");
const authorize = require("../middlewares/auth");
const mongoose = require('mongoose');

// Get Maps
router.route("/map/").get(authorize, (req, res) => {
  mapSchema.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

//Create map
router.post("/map/", authorize, (req, res, next) => {
  
  const graph = {}
  const markers = req.body.markers
  const {name, description, id_place, level, year, location, active} = req.body.map;
  const markerArray = []

  for (const marker in markers){
    Object.assign(graph, {[marker]: markers[marker].associates})
  }

  const map = new mapSchema({
    name,
    description,
    id_place,
    level,
    year,
    location,
    active,
    graph
  });

  map.save()
    .then((response) => {

      //console.log(markerSchema.find({map_id: { $exists: false}}))
      console.log("ID is: ", map._id)
      markerSchema.updateMany({map_id: { $exists: false}}, {map_id: map._id}, function(err, numberAffected, rawResponse) {
        //handle it
        if(err) {
          console.log(err)
        }
     })
     for (const marker in markers){
      markers[marker] = {...markers[marker], map_id:map._id}
      markerArray.push(markers[marker])
    }
    
    //console.log(markerArray)
    markerSchema.insertMany(markerArray)
    .then(function(){
      console.log('Markers succesfully created')
    }).catch(function(error){
      console.log('error adding markers:', error)
    })

      res.status(201).json({
        message: "Map successfully created!",
        result: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

// Get Single Map
router.route("/map/:id").get((req, res, next) => {
  mapSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        message: "Map retrieved successfully",
        result: data,
      });
    }
  });
});

// Get Markers of a single Map
router.route("/map/:id/markers").get((req, res, next) => {
  
  const mapId = mongoose.Types.ObjectId(req.params.id);

  markerSchema.find({map_id: mapId}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        message: "Map markers retrieved successfully",
        result: data,
      });
    }
  });
});

// Update Map
router.route("/map/:id").put(authorize, (req, res, next) => {
  mapSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Map successfully updated!");
      }
    }
  );
});

// Delete Map
router.route("/map/:id").delete(authorize, (req, res, next) => {
  mapSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
