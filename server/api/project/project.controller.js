'use strict';

var _ = require('lodash');
var Project = require('./project.model');
var User = require('../user/user.model');

// Get list of projects
exports.index = function(req, res) {
  var sortCriteria = req.query.value || 'name',
      findCriteria = req.query.name ? {
        name: new RegExp('.*' + req.query.name + '.*', 'ig')
      } : {},
      skip = req.query.skip;

  Project.find(findCriteria).select("-team")
         .sort(sortCriteria)
         .limit(10)
         .skip(skip)
         .exec(function (err, projects) {
            if(err) { return handleError(res, err); }
            return res.json(200, projects);
          });
};

exports.typeahead = function(req, res) {
  var findCriteria = req.query.name ? {
        name: new RegExp('.*' + req.query.name + '.*', 'ig')
      } : {};

  Project.find(findCriteria)
         .select("name _id")
         .exec(function (err, projects) {
            if(err) { return handleError(res, err); }
            return res.json(200, projects);
          });
};

// Get a single project
exports.show = function(req, res) {
  Project.findById(req.params.id)
         .populate('team.developer')
         .exec(function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  // authenicate before creating in index.js?
  console.log('req.body: ', req.body);
  Project.create(req.body, function(err, project) {
    console.log('created project: ', project);
    if(err) { return handleError(res, err); }
    var team = req.body.team;
    for (var i = 0, len = team.length; i < len; i++) {
      User.findByIdAndUpdate(
        team[i]._id, 
        {
          $addToSet: {
            projects: project._id
          }
        }
      );
    }
    return res.json(project);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}