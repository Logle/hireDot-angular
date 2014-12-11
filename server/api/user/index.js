'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

// router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router.get('/typeahead', controller.typeahead);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/followDeveloper', controller.followDeveloper);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/update', auth.isAuthenticated(), controller.update);

router.put('/:id/editProfile', controller.editProfile);

module.exports = router;
