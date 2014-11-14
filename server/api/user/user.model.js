'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authTypes = ['linkedin'];
var crypto = require('crypto');

var WorkExperienceSchema = new Schema({
  title: String,
  startDate: { year: Number, month: Number },
  endDate: { year: Number, month: Number },
  isCurrent: Boolean,
  id: Number,
  company: Schema.Types.Mixed
}, { _id: false });

var EducationSchema = new Schema({
  startDate: { year: Number, month: Number },
  endDate: { year: Number, month: Number },
  schoolName: String,
  notes: String,
  id: Number,
  fieldOfStudy: String,
  degree: String,
  activities: String
}, { _id: false });

var VisitorSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  timeOfVisit: { type: Date, default: Date.now }
}, { _id: false });

var VisitedSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  timeVisited: { type: Date, default: Date.now }
}, { _id: false });

var UserSchema = new Schema({
  role: { type: String, default: 'user' },
  name: String,
  email: { type: String, lowercase: true },
  title: String,
  provider: String,
  linkedin: {},
  linkedinUrl: String,
  twitterUrl: String,
  facebookUrl: String,
  githubUrl: String,
  videoUrl: String,
  summary: String,
  cohort: { type: Schema.Types.ObjectId, ref: 'Cohort' },
  skills: String,
  location: String,
  resumeUrl: String,
  relocate: { type: Boolean, default: true },
  profilePicture: {
    crops: Object,
    original: String
  },
  funnyProfilePicture: {
    crops: Object,
    original: String
  },
  hired: { type: Boolean, default: false },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  followDevelopers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  educations: [EducationSchema],
  workExperiences: [WorkExperienceSchema],
  visited: [VisitedSchema],
  visitors: [VisitorSchema],
  hashedPassword: String
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
