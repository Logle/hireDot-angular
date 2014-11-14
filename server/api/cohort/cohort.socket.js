/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Cohort = require('./cohort.model');

exports.register = function(socket) {
  Cohort.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Cohort.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cohort:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cohort:remove', doc);
}