/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Project = require('../api/project/project.model');
var User = require('../api/user/user.model');
var Cohort = require('../api/cohort/cohort.model');
var async = require('async');
/*
// Seed User
var summer = {
  name: 'Summer Uehara McDonald',
  provider: 'linkedin',
  email: 'hellosummermcdonald@gmail.com',
  location: 'San Fransisco, CA',
  githubUrl: 'https://github.com/summermichiko',
  linkedInUrl: 'https://www.linkedin.com/profile/view?id=297787710&authType=name&authToken=2KOW&trk=api*a3226473*s3299743*',
  hired: false,
  relocate: false,
  resume: 'https://www.filepicker.io/api/file/xEhCxcoTiGHTe1FbQvVJ',
  isDeveloper: true,
  skills: 'Angular.js, Node.js, JavaScript, MongoDB, Express, AJAX, jQuery, HTML5, CSS3, OAuth, RESTful APIs',
  summary: 'Hi! I’m Summer, a web developer hailed from Pauoa Valley, Oahu who loves designing thoughtful experiences with pixels and code. In addition to building really good looking interfaces and web apps, I love chubby pugs, fine-lined tats, and Chocolate Teddy Grahams. Check out my portfolio, and don’t forget to say hello!',
  profilePicture: {
    crops: {
      _200x200: 'https://www.filepicker.io/api/file/zhfEsZzQpGxi1RsTG7RE'
    },
    original: 'https://www.filepicker.io/api/file/XX0VgficRR2AcHstERpb'
  },
  educations: [{
    fieldOfStudy: 'Web Development',
    notes: 'Web development course with a focus on the MEAN stack: MongoDB, Express, Angular.js, Node.js',
    schoolName: 'Fullstack Academy',
    startDate: {
      month: 1,
      year: 2012
    },
    endDate: {
      month: 3,
      year: 2014
    }
  }, {
    degree: 'Bachelor of Science (BS)',
    fieldOfStudy: 'Elementary Education',
    notes: 'President’s Academic Scholarship, 2006 – 2010\n\nDean’s List Recipient, 2006 - 2010\n\nPacific Islander’s Organization Vice President, 2009 – 2010\n• Directed organization’s annual Lu`au accommodating 450 people\n• Organized various campus activities and events for PIO University students\n\nAlpha Leader – Student Leadership Program, 2007\n• Directed focused discussions with first-year students to develop a strength-based community\n• Organized on and off-campus activities for first-year students',
    schoolName: 'Azusa Pacific University',
    startDate: {
      month: 10,
      year: 2010
    },
    endDate: {
      month: 12,
      year: 2012
    }
  }, {
    degree: 'Diploma',
    notes: 'H.P. McCormick Distinguished Founders Award Recipient, 2006\nClass President, 2004 - 2005, 2005 - 2006',
    schoolName: 'Hawaii Baptist Academy',
    startDate: {
      month: 9,
      year: 2006
    },
    endDate: {
      month: 3,
      year: 2008
    }
  }],
  workExperience: [{
    title: 'Fullstack Software Engineer',
    company: {
      name: 'Butterbean',
      industry: "Internet"
    },
    isCurrent: false,
    startDate: {
      month: 7,
      year: 2014
    },
    endDate: {
      month: 10,
      year: 2014
    }
  },{
    title: 'Front End Developer',
    company: {
      name: 'Cardify',
      industry: "Internet"
    },
    isCurrent: false,
    startDate: {
      month: 7,
      year: 2014
    },
    endDate: {
      month: 10,
      year: 2014
    }
  }, {
    title: 'Founder/Program Director',
    company: {
      name: 'Branch Studios Hawaii',
      industry: "Internet"
    },
    isCurrent: false,
    startDate: {
      month: 7,
      year: 2012
    },
    endDate: {
      month: 2,
      year: 2014
    }
  },{
    title: 'Homeless Youth Specialist',
    company: {
      name: "Ka Pa'alana, Partners in Development Foundation",
      industry: "Internet"
    },
    isCurrent: false,
    startDate: {
      month: 9,
      year: 2010
    },
    endDate: {
      month: 6,
      year: 2011
    }
  }]
};

var mike = {
  name: 'Michael Novak',
  provider: 'linkedin',
  email: 'mnovak419@gmail.com',
  githubUrl: 'https://github.com/mnovak20',
  linkedInUrl: 'https://www.linkedin.com/profile/view?id=39506613&authType=name&authToken=HnJF&trk=api*a3238933*s3311943*',
  hired: false,
  relocate: true,
  isDeveloper: true,
  skills: 'JavaScript, Node.js, AngularJS, MongoDB, Express, Socket.io, AJAX, RESTful architecture, MEAN stack, HTML, CSS, Bootstrap, jQuery, Google API, OAuth, Git, Series 3, Series 7, Series 63, Series 55, Fidessa, Financial Modeling, Equities, Prime Brokerage, Equity Finance, Repo, Loanet, Anvil Arts, Sunga',
  profilePicture: {
    crops: {
      _200x200: 'https://www.filepicker.io/api/file/Uo0l9OrTwKh1XsZIqIjG'
    },
    original: 'https://www.filepicker.io/api/file/xHX54zwQlmcQSbNyQ1hB'
  },
  educations: [{
    notes: 'http://www.fullstackacademy.com/',
    schoolName: 'Fullstack Academy',
    startDate: {
      year: 2014
    },
    endDate: {
      year: 2014
    }
  }, {
    degree: 'Pre-Business',
    schoolName: 'George Mason University',
    startDate: {
      year: 2005
    },
    endDate: {
      year: 2007
    }
  }, {
    degree: 'English Literature',
    activities: 'Varsity Football',
    schoolName: '青山学院大学 / Aoyama Gakuin University',
    startDate: {
      year: 2004
    },
    endDate: {
      year: 2005
    }
  }],
  workExperience: [{
    title: 'AVP - Equity trader',
    company: {
      name: 'Daiwa Capital Markets',
      industry: "Financial Services"
    },
    isCurrent: false,
    startDate: {
      month: 9,
      year: 2012
    },
    endDate: {
      month: 10,
      year: 2014
    }
  },{
    title: 'Associate - Stock loan trader',
    company: {
      name: 'Mizuho Securities USA Inc.',
      industry: "Financial Services"
    },
    isCurrent: false,
    startDate: {
      month: 6,
      year: 2009
    },
    endDate: {
      month: 6,
      year: 2012
    }
  }]
};

var jaimie = {
  name: 'Jaimie Li',
  provider: 'linkedin',
  email: 'jaimieli@gmail.com',
  location: 'New York, NY',
  githubUrl: 'https://github.com/jaimieli',
  linkedInUrl: 'https://www.linkedin.com/profile/view?id=77749083&authType=name&authToken=spjp&trk=api*a3238933*s3311943*',
  hired: false,
  relocate: false,
  isDeveloper: true,
  skills: 'HTML, CSS, JavaScript, Angular.js, Node.js/Express.js, MongoDB, Research, Curriculum Development, Curriculum Design, Program Development, Community Outreach, Public Speaking, Grant Writing, Fundraising, Teaching, Educational Technology, Educational Leadership, Staff Development, Nonprofits, Higher Education',
  profilePicture: {
    crops: {
      _200x200: 'https://www.filepicker.io/api/file/cqfYYS22Q1ed9yyqkvuS'
    },
    original: 'https://www.filepicker.io/api/file/uZ0bCL2RGOjv2R62cXMp'
  },
  educations: [{
    fieldOfStudy: 'Biology, Dance & Performance Studies',
    degree: 'Bachelor of Arts with Honors',
    schoolName: 'University of California, Berkeley',
    startDate: {
      month: 8,
      year: 2005
    },
    endDate: {
      month: 5,
      year: 2009
    }
  }],
  workExperience: [{
    title: 'Math Teacher',
    company: {
      name: 'Teach For America',
      industry: "Education Management"
    },
    isCurrent: false,
    startDate: {
      year: 2012
    },
    endDate: {
      year: 2014
    }
  },{
    title: 'Research Analyst, Breast Cancer Research',
    company: {
      name: 'County of Marin',
      industry: "Education Management"
    },
    isCurrent: false,
    startDate: {
      month: 5,
      year: 2009
    },
    endDate: {
      month: 1,
      year: 2008
    }
  }]
};

var gabriel = {
  name: 'Gabriel Lebec',
  provider: 'linkedin',
  email: 'glebec@gmail.com',
  location: 'New York, NY',
  githubUrl: 'http://www.github.com/glebec',
  linkedInUrl: 'https://www.linkedin.com/profile/view?id=353777953&authType=name&authToken=_tzx&trk=api*a3238933*s3311943*',
  hired: false,
  relocate: false,
  resume: 'https://www.filepicker.io/api/file/yp0DQuFjQGyZgbfDgaUT',
  isDeveloper: true,
  skills: 'JavaScript, AngularJS, MEAN stack, Git, HTML, CSS, SASS, Digital Photography, Typography, Calligraphy, Drawing, Aperture, InDesign, Photoshop, Research, Regular Expressions, Google API, D3.js, jQuery, Bootstrap, Firebase, WebSockets, Karma, MySQL, Visual Field, Tonometry, Optical Coherence Tomograph',
  summary: "I love motivated design, i.e. beautiful solutions or creations intended to be used. I've studied many forms of art, including typography, calligraphy, photography, and drawing. For over sixteen years I have held a deep passion for the art, science, history, culture, and appraisal of nihontō—Japanese",
  profilePicture: {
    crops: {
      _200x200: 'https://www.filepicker.io/api/file/xrcFPCmIS2qHoapBOL2K'
    },
    original: 'https://www.filepicker.io/api/file/g1kwqT5FQNWcavbAv95d'
  },
  educations: [{
    fieldOfStudy: 'Web Applications Development',
    notes: 'Learning MEAN stack web applications development, including Git, HTML5/CSS3, Node.js / Express, MongoDB, AngularJS, etc.',
    schoolName: 'Fullstack Academy',
    startDate: {
      year: 2014
    },
    endDate: {
      year: 2014
    }
  }, {
    fieldOfStudy: 'Pre-Medicine/Pre-Medical Studies',
    schoolName: 'New York University',
    startDate: {
      year: 2008
    },
    endDate: {
      year: 2010
    }
  }],
  workExperience: [{
    title: 'Ophthalmic Clinical / Research Technician',
    company: {
      name: 'Glaucoma Associates of New York',
      industry: "Computer Software"
    },
    isCurrent: false,
    startDate: {
      month: 5,
      year: 2010
    },
    endDate: {
      month: 7,
      year: 2012
    }
  },{
    title: 'Researcher',
    company: {
      name: 'New York University',
      industry: "Higher Education"
    },
    isCurrent: false,
    startDate: {
      month: 6,
      year: 2010
    },
    endDate: {
      month: 7,
      year: 2009
    }
  }]
};

var ginna = {
  name: 'Ginna Baker',
  provider: 'linkedin',
  email: 'ginna.baker@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/profile/view?id=297787710&authType=name&authToken=2KOW&trk=api*a3226473*s3299743*',
  hired: false,
  relocate: false,
  resume: 'https://www.filepicker.io/api/file/6jCftTZCRzuOnO0Mok1K',
  isDeveloper: true,
  skills: 'JavaScript, AngularJS, Node.js, jQuery, MongoDB, HTML5, SASS, Grant Writing, Editing, Technical Writing, Program Management, Volunteer Management, Leadership, Press Releases, Program Development, Workforce Development, Research, Public Speaking, Team Leadership, Creative Problem Solving, Quality Assurance, Database Administration, Statistical Data Analysis, Career Development',
  summary: 'Specialties: JavaScript; Project management; Debugging',
  profilePicture: {
    crops: {
      _200x200: 'https://www.filepicker.io/api/file/LhnfSpd9SGih8ZyYqhIf'
    },
    original: 'https://www.filepicker.io/api/file/hehMp3sARdWwSTKGhCuU'
  },
  educations: [{
    degree: 'MEAN Stack Portfolio',
    fieldOfStudy: 'Fullstack Web Development',
    notes: 'Fullstack Academy is an immersive five-month course that uses JavaScript to teach computer science. Students at the Academy learn end-to-end web development using Node.js/Express, JavaScript, Angular.js, HTML5, and CSS3. http://www.fullstackacademy.com/curriculum',
    schoolName: 'Fullstack Academy',
    startDate: {
      month: 1,
      year: 2014
    },
    endDate: {
      month: 3,
      year: 2014
    }
  }, {
    degree: 'BA',
    fieldOfStudy: 'English, History',
    schoolName: 'St. Olaf College',
    startDate: {
      year: 2003
    },
    endDate: {
      year: 2007
    }
  }],
  workExperience: [{
    title: 'Fullstack Web Developer',
    company: {
      name: 'Fullstack Academy',
      type: 'Educational Institution',
      size: '11-50 employees',
      industry: "Internet"
    },
    isCurrent: true,
    startDate: {
      month: 6,
      year: 2014
    }
  },{
    title: 'Freelance Writer',
    company: {
      name: 'Self-employed',
      industry: "Writing and Editing"
    },
    isCurrent: true,
    startDate: {
      month: 7,
      year: 2005
    }
  },
  {
    title: 'Operations Associate - Team Captain',
    company: {
      name: 'American Corporate Partners',
      industry: "Nonprofit Organization Management"
    },
    isCurrent: false,
    startDate: {
      month: 7,
      year: 2012
    },
    endDate: {
      month: 5,
      year: 2014
    }
  }]
};

// Seed Personal Project
var butterbean = {
  name: 'Butterbean',
  url: 'http://butterbean.herokuapp.com',
  githubUrl: 'https://github.com/summermichiko/butterbean',
  pitch: 'An online directory for parents to discover fun adventures for their families',
  techTags: 'Angular.js, Express, MongoDB, Node.js, Javascript, HTML5, CSS3, Google Maps API, Yelp API, Cheerio API, Request API, Async Library',
  description: 'Butterbean is an in-depth Yelp for parents. It features the people and values behind companies serving young families. Parents can search Butterbean for schools, outdoor activities, restaurants, enrichment opportunities, cultural events, and healthcare providers. They’ll be able to easily filter and navigate vibrant profiles, bookmark their favorite ones, and find related organizations that may suit their interest.',
  views: 100,
  images: [{
    original: 'https://www.filepicker.io/api/file/LW5QH0TERXCDzwjoll7T',
    crops: {
      _150x150: 'https://www.filepicker.io/api/file/8ntUqckkRuea39uKW94T'
    }
  }]
};

var soWhatsForDinner = {
  name: "So what's for dinner?",
  githubUrl: 'https://github.com/mnovak20/sowhatsfordinner',
  pitch: 'Simplifying the dinner plan decision making process.',
  techTags: 'Javascript, Angular, Node.js, Express, MongoDB, socket.io, HTML5, CSS3',
  views: 10,
  images: [{
    original: 'https://www.filepicker.io/api/file/1nrHf3dlR1mGEDxL5jL7',
    crops: {
      _150x150: 'https://www.filepicker.io/api/file/9mj18rAGTMWdM0G8JirO'
    }
  }]
};

var threeSixtyNews = {
  name: '3.6.0.',
  githubUrl: 'https://github.com/jaimieli/news',
  pitch: 'News article aggregator that compares sentiments across news outlets and visualizes data',
  techTags: 'Angular.js, Node.js, Express.js, NVD3, Twitter API, Alchemy API, Kimono API, socket.io',
  views: 50,
  images: [{
    original: 'https://www.filepicker.io/api/file/3nx4Cc7QF6sAWclYvmkV',
    crops: {
      _150x150: 'https://www.filepicker.io/api/file/ij6PKNNsQSivlTX2jpdc'
    }
  }]
};

var unFinished = {
  name: 'Unfinished',
  views: 0
};

var airHostLuxe = {
  name: 'Air Host Luxe',
  githubUrl: 'https://github.com/ginna-baker/air_host_LUXE',
  pitch: 'CMS for Air B and B Hosts',
  techTags: 'AngularJS, NodeJS, ExpressJS, MongoDB',
  description: 'Luxe is a CMS platform that lets any AirBNB host become the local tour guide/luxury concierge for their guests by creating a beautiful custom website for their property. This website allows the host to provide activity suggestions, restaurant picks, and tips to guests for enjoying the area.',
  views: 75
};

// Seed Group Projects
// Flock
// Jaimie Li => Fullstack Developer
// Mike Novak => Backend Developer
// Summer McDonald => Front End Developer
var flock = {
  name: 'Flock',
  githubUrl: 'https://github.com/jaimieli/companyCulture',
  pitch: 'A suite of customizable games that helps build successful company culture',
  techTags: 'Angular.js, Node.js, Express.js, MongoDB, Google oAuth, Async',
  views: 60,
  images: [{
    original: 'https://www.filepicker.io/api/file/QUK9LwHSTzWSFPbwPtvL',
    crops: {
      _150x150: 'https://www.filepicker.io/api/file/aNaDiDRfR5S2L36LvJfu'
    }
  }]
};

// Cardify
// Jaimie Li => Frontend Developer
// Mike Novak => Fullstack Developer
// Summer McDonald => Backend Developer
var cardify = {
  name: 'Cardify',
  githubUrl: 'https://github.com/jaimieli/cardifyTest',
  pitch: 'Platform for job seekers to research AngelList startups using a card organization system',
  techTags: 'Angular.js, Node.js, Express.js, AngelList API, Crunchbase API',
  views: 80,
  images: [{
    original: 'https://www.filepicker.io/api/file/0RqRV1uMQNGbEicLeiYF',
    crops: {
      _150x150: 'https://www.filepicker.io/api/file/N44rVVrhRKmc59Z5odC9'
    }
  }]
};

// Gnitty
// Gabriel Lebec => Frontend Architect
// Ginna Baker => Backend Developer
var gNitty = {
  name: 'Gnitty',
  githubUrl: 'http://www.github.com/glebec/gnitty',
  pitch: 'Analyze your Gmail — get down to the gnitty-gritty!',
  techTags: 'Angular, Node.js, Express, Gmail API, D3, Alchemy',
  views: 150
};

var july2014 = {
  name: 'July 2014'
};

// Array of Users and Group Projects
var arrOfUsersAndProjects = [{
  user: summer,
  project: butterbean
}, {
  user: mike,
  project: soWhatsForDinner
}, {
  user: jaimie,
  project: threeSixtyNews
}, {
  user: gabriel,
  project: unFinished
}, {
  user: ginna,
  project: airHostLuxe
}];

// Array of Users and Group Project Roles
var arrOfGroupProjectsAndRoles = [{
  project: flock,
  roles: [{
    user: summer,
    role: 'Front End Developer'
  }, {
    user: jaimie,
    role: 'Fullstack Developer'
  }, {
    user: mike,
    role: 'Back End Developer'
  }]
}, {
  project: cardify,
  roles: [{
    user: summer,
    role: 'Back End Developer'
  }, {
    user: jaimie,
    role: 'Front End Developer'
  }, {
    user: mike,
    role: 'Fullstack Developer'
  }]
}, {
  project: gNitty,
  roles: [{
    user: ginna,
    role: 'Back End Architect'
  }, {
    user: gabriel,
    role: 'Front End Architect'
  }]
}];

// Array of Users and Cohorts
var arrOfCohortsAndUsers = [{
  cohort: 'June 2014',
  users: [ginna, gabriel]
}, {
  cohort: 'July 2014',
  users: [summer, jaimie, mike]
}];

var removeAllUsers = function(doneRemoveAllUsers) {
  User.find({}).remove(function(err, users) {
    var result = 'done removing all users';
    console.log(result);
    doneRemoveAllUsers(err, result);
  });
};

var removeAllProjects = function(doneRemoveAllProjects) {
  Project.find({}).remove(function(err, projects) {
    var result = 'done removing all projects';
    console.log(result);
    doneRemoveAllProjects(err, result);
  });
};

var removeAllCohorts = function(doneRemoveAllCohorts) {
  Cohort.find({}).remove(function(err, cohorts) {
    var result = 'done removing all cohorts';
    console.log(result);
    doneRemoveAllCohorts(err, result)
  });
};

var createUsersAndPersonalProjects = function(doneCreateUsersAndPersonalProjects) {
  var createOneUserAndPersonalProject = function(userAndProject, doneCreateOneUserAndPersonalProject) {
    var createOneUser = function(doneCreateOneUser) {
      User.create(userAndProject.user, function(err, user) {
        doneCreateOneUser(err, user);
      });
    };

    var createOnePersonalProject = function(user, doneCreateOnePersonalProject) {
      Project.create(userAndProject.project, function(err, project) {
        project.team.push({
          role: 'Fullstack Developer',
          userId: user._id
        });
        project.save(function(err, project) {
          user.projects.push(project._id);
          user.save(function(err, user) {
            doneCreateOnePersonalProject(err, user);
          });
        });
      });
    };

    var finishCreateOneUserOnePersonalProject = function(err, result) {
      console.log("done creating a user named " + result.name + " and personal project " + result.projects[0]);
      doneCreateOneUserAndPersonalProject(err);
    };

    async.waterfall([createOneUser, createOnePersonalProject], finishCreateOneUserOnePersonalProject);
  };

  var finishCreateUsersAndPersonalProjects = function(err) {
    doneCreateUsersAndPersonalProjects(err, 'done creating 5 users and 5 personal projects');
  };

  async.each(arrOfUsersAndProjects, createOneUserAndPersonalProject, finishCreateUsersAndPersonalProjects);
};

var createGroupProjects = function(doneCreateGroupProjects) {
  var createOneGroupProjectAndRoles = function(oneGroupProjectAndRoles, doneCreateOneGroupProjectAndRoles) {
    var createOneGroupProject = function(doneCreateOneGroupProject) {
      Project.create(oneGroupProjectAndRoles.project, function(err, project) {
        doneCreateOneGroupProject(err, project);
      });
    };

    var assignRolesToOneGroupProject = function(project, doneAssignRolesToOneGroupProject) {
      var arrOfRoles = oneGroupProjectAndRoles.roles;

      var assignOneRoleToOneGroupProject = function(oneRole, doneAssignOneRoleToOneGroupProject) {
        User.findOne({ name: oneRole.user.name }, function(err, user) {

          // Assign one group project to a user
          user.projects.push(project._id);
          user.save(function(err, user) {

            // Put a user with his/her role as a member in the project
            project.team.push({
              role: oneRole.role,
              userId: user._id
            });
            project.save(function(err, project) {
              doneAssignOneRoleToOneGroupProject(err);
            });
          });
        });
      };

      var finishAssignRolesToOneGroupProject = function(err) {
        console.log("done assigning roles for " + project.name);
        doneAssignRolesToOneGroupProject(err);
      };

      async.each(arrOfRoles, assignOneRoleToOneGroupProject, finishAssignRolesToOneGroupProject);
    };

    var finishCreateOneGroupProjectAndAssignRoles = function(err, result) {
      console.log("done creating one group project and assign roles");
      doneCreateOneGroupProjectAndRoles(err);
    };

    async.waterfall([createOneGroupProject, assignRolesToOneGroupProject], finishCreateOneGroupProjectAndAssignRoles);
  };

  var finishCreateGroupProjectsAndAssignRoles = function(err) {
    doneCreateGroupProjects(err, "done creating 3 group projects and assign roles");
  };

  async.each(arrOfGroupProjectsAndRoles, createOneGroupProjectAndRoles, finishCreateGroupProjectsAndAssignRoles);
};

var assignUsersToCohorts = function(doneAssignUsersToCohorts) {
  var createOneCohortAndUsers = function(oneCohortAndUsers, doneCreateOneCohortAndUsers) {
    var createOneCohort = function(doneCreateOneCohort) {
      Cohort.create({ name: oneCohortAndUsers.cohort }, function(err, cohort) {
        doneCreateOneCohort(err, cohort);
      });
    };

    var assignUsersToCohort = function(cohort, doneAssignUsersToCohort) {
      var assignOneUserToCohort = function(oneUser, doneAssignOneUserToCohort) {
        User.findOne({ name: oneUser.name }, function(err, user) {

          // Assign this user to a cohort
          user.cohort = cohort._id;
          user.save(function(err, user) {

            // Assign the cohort this user
            cohort.students.push(user._id);
            cohort.save(function(err, cohort) {
              doneAssignOneUserToCohort(err);
            });
          });
        });
      };

      var finishAssignUsersToOneCohort = function(err) {
        console.log("done assigning users for " + cohort.name);
        doneAssignUsersToCohort(err);
      };

      async.each(oneCohortAndUsers.users, assignOneUserToCohort, finishAssignUsersToOneCohort);
    };

    var finishCreateOneCohortAndAssignUsers = function(err, result) {
      console.log("done creating one cohort and assign users");
      doneAssignUsersToCohorts(err);
    };

    async.waterfall([createOneCohort, assignUsersToCohort], finishCreateOneCohortAndAssignUsers)
  };

  var finishCreateCohortsAndAssignUsers = function(err) {
    doneAssignUsersToCohorts(err, 'done assigning 5 users to 2 cohorts');
  };

  async.each(arrOfCohortsAndUsers, createOneCohortAndUsers, finishCreateCohortsAndAssignUsers);
};

async.series([removeAllUsers, removeAllProjects, removeAllCohorts,createUsersAndPersonalProjects, createGroupProjects, assignUsersToCohorts], function(err, results) {
  console.log(results);
});


// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });

*/
// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );

// });