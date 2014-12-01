'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  var sortCriteria = req.query.value || 'name',
      skip = req.query.skip;

  var findCriteria = function() {
    if (req.query.name) {
      return {
        name: new RegExp('.*' + req.query.name + '.*', 'ig')
      }
    }

    var findCriteria = {};

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
      .populate('projects')
      .exec(function(err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

exports.typeahead = function(req, res) {
  User.find()
      .select("name _id")
      .exec(function(err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
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

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId)
      .populate('cohort projects')
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

// for current user to follow a developer

exports.followDeveloper = function(req, res, next) {
  var devPosition;
  User.findOne({_id: new ObjectId(req.body.user)}, function(err, user){
    if (err) return next(err);
    if (!user) return res.json(401);
    devPosition = user.followDevelopers.indexOf(new ObjectId(req.body.dev));
    if (devPosition === -1) {
      user.followDevelopers.push(new ObjectId(req.body.dev));
      user.save();
      res.send(200);
    } else {
      user.followDevelopers.splice(devPosition,1);
      user.save();
      res.send(200);
    }
  });
};
