'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
  role: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { _id: false });

var ImageSchema = new Schema({
  crops: Object,
  original: String
}, { _id: false });

var ProjectSchema = new Schema({
  name: String,
  githubUrl: String,
  pitch: String,
  description: String,
  techTags: String,
  images: [ImageSchema],
  videoUrl: String,
  url: String,
  views: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  team: [MemberSchema],
  lastUpdated: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Project', ProjectSchema);