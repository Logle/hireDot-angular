'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
  role: String,
  developer: { type: Schema.Types.ObjectId, ref: 'User' }
}, { _id: false });

var ImageSchema = new Schema({
  crops: Object,
  original: String
}, { _id: false });

var ProjectSchema = new Schema({
  name: String,
  githubURL: String,
  shortPitch: String,
  description: String,
  techStackTags: String,
  images: [ImageSchema],
  videoURL: String,
  url: String,
  views: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  team: [MemberSchema],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);