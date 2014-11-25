var conn = new Mongo();

// Starting Database => devstarter
var dbDevStarter = conn.getDB("devstarter");
var usersDevstarter = dbDevStarter.users;

// Target Database => hiredot-dev
var dbHireDot = conn.getDB("hiredot-dev");
var usersHireDot = dbHireDot.users;
var projectsHireDot = dbHireDot.projects;
var cohortsHireDot = dbHireDot.cohorts;

// Creating Cohort Data to hiredot-dev
cohortsHireDot.insert([{ name: "January 2014",
                         date: new Date("January 2014") },
                       { name: "April 2014",
                         date: new Date("April 2014") },
                       { name: "June 2014",
                         date: new Date("June 2014") },
                       { name: "July 2014",
                         date: new Date("July 2014") },
                       { name: "September 2014",
                         date: new Date("September 2014") },
                       { name: "November 2014",
                         date: new Date("November 2014") }]);

// A helper function to map the role
function roleChecker(rolesArray) {
  for (var i = 0; i < rolesArray.length; i++) {
    if (rolesArray[i].approved === true) {
      return rolesArray[i].type;
    }
  }
  return 'user';
};


// Migrating and Filtering Users Data from devstarter to hiredot-dev
usersDevstarter.find({}).forEach(function(userDevStarter) {
  // Basic userHireDot profile
  var userHireDot = {
    role: roleChecker(userDevStarter.roles),
    name: userDevStarter.name,
    email: userDevStarter.email,
    title: userDevStarter.linkedin.headline,
    provider: 'linkedin',
    linkedin: userDevStarter.linkedin,
    linkedinUrl: userDevStarter.linkedin_url,
    twitterUrl: userDevStarter.twitter_url,
    facebookUrl: userDevStarter.facebook_url,
    githubUrl: userDevStarter.github_url,
    videoUrl: userDevStarter.video_url,
    summary: userDevStarter.summary,
    skills: userDevStarter.skills,
    location: userDevStarter.location,
    resumeUrl: userDevStarter.resume,
    relocate: true,
    profilePicture: userDevStarter.profile_picture,
    funnyProfilePicture: userDevStarter.funny_profile_picture,
    hired: userDevStarter.hired,
    educations: userDevStarter.educations,
    workExperiences: userDevStarter.work_experiences
  };

  // Insert one userHireDot basic profile to usersHireDot database
  usersHireDot.insert(userHireDot)

  // Put a user into a cohort and vice versa
  if (userDevStarter.cohort) {
    var foundCohort = cohortsHireDot.findOne({ "name": userDevStarter.cohort });
    var foundUser = usersHireDot.findOne({ "name": userDevStarter.name });

    cohortsHireDot.findAndModify({
      query: { "name": userDevStarter.cohort },
      update: { $push: { "students": foundUser._id }}
    });

    usersHireDot.findAndModify({
      query: { "name": userDevStarter.name },
      update: { $set: { "cohort": foundCohort._id } }
    });
  }


  // Migrate projects to project database
  if (userDevStarter.projects.length > 0) {
    userDevStarter.projects.forEach(function(project) {
      var foundUser = usersHireDot.findOne({ "name": userDevStarter.name });
      var projectHireDot = {
        name: project.name,
        githubUrl: project.githubUrl,
        pitch: project.pitch,
        description: project.description,
        techTags: project.tech_tags,
        images: [project.image],
        url: project.url,
        lastUpdated: Date.now(),
      };

      // Update and upsert = true to check whether a project already
      // exist or not, if not, create one
      projectsHireDot.update({ name: project.name }, {
        $set: projectHireDot,

        // Add one or many foundUser._id to the project team
        $addToSet: {
          team: {
            role: project.role,
            userId: foundUser._id
          }
        }
      }, { upsert: true });
    });
  }

  // Put projects into each user
  projectsHireDot.find({}).forEach(function(project) {
    project.team.forEach(function(member) {
      usersHireDot.findAndModify({
        query: { "_id": member.userId },
        update: { $addToSet: { "projects": project._id } }
      });
    });
  });
});










