var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

var ifExist = function(value) {
  if (value !== undefined) {
    return value.values.map(function(skill) {
      return skill.skill.name;
    }).join(", ");
  }
  else {
    console.log('User has no skills listed to be mapped. Skills set to empty string');
    return ''
  }
};

var parseLinkedIn = function(profile) {
  return {
    name: profile.displayName,
    email: profile._json.emailAddress,
    workExperiences: profile._json.positions.values,
    educations: profile._json.educations.values,
    skills: ifExist(profile._json.skills),
    summary: profile._json.summary,
    linkedin: profile._json,
    linkedinUrl: profile._json.siteStandardProfileRequest.url,
    provider: 'linkedin',
    relocate: true
  };
};

exports.setup = function (User, config) {
  passport.use(new LinkedInStrategy({
      consumerKey: config.linkedIn.clientID,
      consumerSecret: config.linkedIn.clientSecret,
      callbackURL: config.linkedIn.callbackURL,
      profileFields: ['id','first-name', 'last-name', 'email-address', 'headline', 'summary', 'specialties', 'picture-url', 'site-standard-profile-request', 'phone-numbers', 'primary-twitter-account', 'interests', 'languages', 'skills', 'certifications', 'educations', 'courses', 'volunteer', 'positions', 'num-recommenders', 'recommendations-received', 'date-of-birth', 'related-profile-views', 'honors-awards']
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({
        'linkedin.id': profile.id
      }, function(err, user) {
        if (!user) {
          var linkedInFields = parseLinkedIn(profile);
          user = new User(linkedInFields);
          user.save(function(err) {
            if (err) {
              done(err);
            }
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
