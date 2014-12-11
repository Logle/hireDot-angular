'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

var validationError = function(res, err) {
  return res.json(422, err);
};

var handleError = function(res, err) {
  return res.send(500, err);
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  var sortCriteria = req.query.value || 'name',
      skip = req.query.skip;

  var findCriteria = function() {
    var findCriteria = req.query.name || req.query.name  === '' ? {
            name: new RegExp('.*' + req.query.name + '.*', 'ig')
          } : {};

    if (req.query.role) findCriteria.role = req.query.role;

    if (req.query.hired && req.query.hired !== "all") {
      findCriteria.hired = JSON.parse(req.query.hired);
    }

    if (req.query.cohort && req.query.cohort !== "all") {
      findCriteria.cohort = req.query.cohort;
    }

    return findCriteria;
  }();

  User.find(findCriteria)
      .sort(sortCriteria)
      .limit(10)
      .skip(skip)
      .populate('projects cohort')
      .exec(function(err, users) {
    if(err) return handleError(res, err);
    res.json(200, users);
  });
};

exports.typeahead = function(req, res) {
  var findCriteria = function() {
    var findCriteria = req.query.name || req.query.name === '' ? {
            name: new RegExp('.*' + req.query.name + '.*', 'ig')
          } : {};

    if (req.query.role) findCriteria.role = req.query.role;

    return findCriteria;
  }();

  console.log("from typeahead", findCriteria);

  User.find(findCriteria)
      .select("name _id")
      .exec(function(err, users) {
    if(err) return handleError(res, err);
    res.json(200, users);
  });
};

// for current user to follow a developer
exports.followDeveloper = function(req, res, next) {
  var devPosition,
      currentUserId = req.params.id,
      developerToFollowId = req.body.developerToFollowId;

  User.findById(currentUserId, function(err, user){
    if (err) return handleError(res, err);

    devPosition = user.followDevelopers.indexOf(developerToFollowId);

    if (devPosition === -1) {
      user.followDevelopers.push(developerToFollowId);
      user.save(function(err, user) {
        if (err) return handleError(res, err);
        res.send(200);
      });
    } else {
      user.followDevelopers.splice(devPosition, 1);
      user.save(function(err, user) {
        if (err) return handleError(res, err);
        res.send(200);
      });
    }
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

exports.update = function(req, res) {
  var id = req.body.user._id;
  User.findById(id)
    // .populate('cohort')
    .exec(function(err, user) {
      if (err) return res.send(500, err);
      else if (!user) return res.send(401);

      req.body.user.cohort = req.body.user.cohort._id;
      user.set(req.body.user);

      user.save(function(err, user) {
        if (err) {
          return validationError(res, err);
        }
        console.log(user.approvedAsDeveloper);
        res.json(user);
      });
    });
};

exports.editProfile = function(req, res) {
  var userId = req.params.id;

  // Without this deletes, error will happen
  delete req.body.cohort;
  delete req.body.projects;
  delete req.body.followDevelopers;
  delete req.body.followProjects;

  User.findByIdAndUpdate(userId, req.body, function(err, user) {
    if (err) return handleError(res, err);
    res.send(200);
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId)
      .populate('projects')
      .exec(function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};


