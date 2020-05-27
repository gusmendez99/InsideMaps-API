// routes/user.routes.js
const express = require("express");
const router = express.Router();
const markerSchema = require("../models/Markers");
const authorize = require("../middlewares/auth");

// Get Markers
//router.route('/user/').get(authorize, (req, res) ...
router.route("/marker/").get((req, res) => {
  markerSchema.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

//Create marker
router.post("/marker/", (req, res, next) => {
  console.log(req.body);
  const marker = new markerSchema({
    name: req.body.name,
    map_id: req.body.map_id,
    loc: { type: "Point", coordinates: req.body.coordinates } 
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