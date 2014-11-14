var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

var ifExist = function(value) {
  if (value !== undefined) {
    return value.values.map(function(skill) {
            return skill.skill.name;
    }).join(", ")
  }
  else {
    console.log('user has no skills listed to be mapped. Skills set to empty string  ')
    return ''
  }
};

var parseLinkedIn = function(profile) {
  return {
    name: profile.displayName,
    headline: profile._json.headline,
    email: profile._json.emailAddress,
    work_experiences: profile._json.positions.values,
    educations: profile._json.educations.values,
    provider: 'linkedin',
    skills: ifExist(profile._json.skills),
    summary: profile._json.summary,
    linkedIn: profile._json,
    linkedin_url: profile._json.siteStandardProfileRequest.url,
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
        'linkedIn.id': profile.id
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
