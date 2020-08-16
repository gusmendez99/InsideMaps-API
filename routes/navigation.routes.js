// routes/navigation.routes.js
const express = require("express");
const router = express.Router();
const mapSchema = require("../models/Maps");
const markerSchema = require("../models/Markers");
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

        const path = findShortestPath(graph, startNode, endNode);
        
        res.status(200).json({
          message: "Shortest path retrieved successfully",
          result: path,
        });
      }
    });
});

module.exports = router;