// routes/user.routes.js
const express = require("express");
const router = express.Router();
const mapSchema = require("../models/Maps");
const authorize = require("../middlewares/auth");

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
    name: req.body.name,
    description: req.body.description,
    id_place: req.body.id_place,
    level: req.body.level,
    age: req.body.age,
    map_filename: req.body.map_filename,
    qr_code: req.body.qr_code
  });
  user.save()
    .then((response) => {
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

// Get Single User
router.route("/map/:id").get(authorize, (req, res, next) => {
  mapSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
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
