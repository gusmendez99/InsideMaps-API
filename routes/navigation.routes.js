// routes/navigation.routes.js
const express = require("express");
const router = express.Router();
const mapSchema = require("../models/Maps");
const markerSchema = require("../models/Markers");
const logbookSchema = require("../models/Logbook")
const jwt = require('jsonwebtoken')
const authorize = require("../middlewares/auth");
const mongoose = require('mongoose');
const findShortestPath = require('../utils/navigation.utils');

// Search a place based on start and end Marker of a single Map
router.post("/navigation/find-shortest-path/:id", (req, res, next) => {
    const {startNode, endNode } = req.body;

    mapSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {

        const graph = JSON.parse(JSON.stringify(data.graph));

        findShortestPath(graph, startNode, endNode).then(path => {
          res.status(200).json({
            message: "Shortest path retrieved successfully",
            result: path,
          });
        }).catch(e => {
          res.status(500).json({
            message: "Error retriving shortest path"
          });
        });
        //saving the activity in the logbook
        const date = new Date()
        const token = req.get('Authorization').replace("JWT ", "")
        const user_id = jwt.decode(token).userId
        const destination_id = endNode
        const distance_traveled = path.distance
        const log = new logbookSchema({
          date,
          user_id,
          destination_id,
          distance_traveled,
        })
        log.save()
        
      }
    });
});

module.exports = router;