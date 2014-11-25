'use strict';

var _ = require('lodash');
var Cohort = require('./cohort.model');

// Get list of cohorts
exports.index = function(req, res) {
  Cohort.find()
        .sort("-date")
        .exec(function (err, cohorts) {
    if(err) { return handleError(res, err); }
    return res.json(200, cohorts);
  });
};

// Get a single cohort
exports.show = function(req, res) {
  Cohort.findById(req.params.id, function (err, cohort) {
    if(err) { return handleError(res, err); }
    if(!cohort) { return res.send(404); }
    return res.json(cohort);
  });
};

// Creates a new cohort in the DB.
exports.create = function(req, res) {
  Cohort.create(req.body, function(err, cohort) {
    if(err) { return handleError(res, err); }
    return res.json(201, cohort);
  });
};

// Updates an existing cohort in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cohort.findById(req.params.id, function (err, cohort) {
    if (err) { return handleError(res, err); }
    if(!cohort) { return res.send(404); }
    var updated = _.merge(cohort, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cohort);
    });
  });
};

// Deletes a cohort from the DB.
exports.destroy = function(req, res) {
  Cohort.findById(req.params.id, function (err, cohort) {
    if(err) { return handleError(res, err); }
    if(!cohort) { return res.send(404); }
    cohort.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}