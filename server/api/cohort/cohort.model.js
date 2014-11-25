'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CohortSchema = new Schema({
  name: String,
  date: { type: Date },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Cohort', CohortSchema);