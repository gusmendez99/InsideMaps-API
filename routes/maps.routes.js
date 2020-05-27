// routes/user.routes.js
const express = require("express");
const router = express.Router();
const mapSchema = require("../models/Maps");
const markerSchema = require("../models/Markers");
const authorize = require("../middlewares/auth");
const mongoose = require('mongoose');

// Get Maps
//router.route('/user/').get(authorize, (req, res) ...
router.route("/map/").get((req, res) => {
  mapSchema.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

//Create map
router.post("/map/", (req, res, next) => {
  console.log(req.body);
  const map = new mapSchema({
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    id_place: req.body.id_place,
    level: req.body.level,
    year: req.body.year,
    location: req.body.location
  });
  map.save()
    .then((response) => {

      markerSchema.findOneAndUpdate({ map_id: null}, {map_id: req.body._id})

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
  
  const val = mongoose.Types.ObjectId(req.params.id);

  
  markerSchema.find({map_id: val}, (error, data) => {
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
router.route("/map/:id").put((req, res, next) => {
  mapSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Map successfully updated!");
      }
    }
  );
});

// Delete Map
router.route("/map/:id").delete((req, res, next) => {
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
