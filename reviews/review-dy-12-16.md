JavaScript Style
- Good JSHint score

MongoDB Schema Design
- User model demonstrates good use of embedding choices, virtual fields and pre/post hooks
- Same with project model - you may want to consider indexing the developer field inside MemberSchema if you're searching for projects based on a user

Node/Express
- Routes are good, standard REST compliance
- At some points, may consider using embedded routes rather than having controllers that are handling two distinct objects - for example, project.controller -> create, here you may have a separate route for adding members to a team rather than creating it.  Also, how do you update that a user has been added to a project?
- ProjectPageController, DeveloperPageController have some shared logic

Angular
https://github.com/johnpapa/angularjs-styleguide
- Excellent Controller size and breakdown, controllers are compact and handle one job well
- Good use of directives in editing forms, might consider creating a directive that can be reused for all the form types for just the bootstrap template
- Good use of routing

Testing
- Did not see testing

Deployment
- Did not see significant use of sockets, might consider removing

Workflow
- Good use for feature branching and git merging for workflow
- Saw some use of Github Issues
