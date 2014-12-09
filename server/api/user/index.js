'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

// router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router.get('/getAll', controller.getAll); // new (temporary?) route to get all users
router.get('/typeahead', controller.typeahead);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/:id/followDeveloper', controller.followDeveloper);
// router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/update', controller.update);

module.exports = router;
