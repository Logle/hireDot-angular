JavaScript Style
- Good JSHint score

MongoDB Schema Design
- User model demonstrates good use of embedding choices, virtual fields and pre/post hooks

Node/Express
- Routes are good, standard REST compliance
- At some points, may consider using embedded routes rather than having controllers that are handling two distinct objects - for example, project.controller -> create, here you may have a separate route for adding members to a team rather than creating it.  Also, how do you update that a user has been added to a project?
- ProjectPageController, DeveloperPageController have some shared logic

Angular
https://github.com/johnpapa/angularjs-styleguide
- Excellent Controller size and breakdown, controllers are compact and handle one job well
- Good use of directives in editing forms, might consider creating a directive that can be reused for all the form types for just the bootstrap template
- Good use of routing
- Use of $scope everywhere, at least know about var vm = this; plenty ofplaces where $scope is not necessary
- Project Page and Developer Page are bundled under view/ - a more RESTful structure would be: 

developers/
    INDEX - browse-all
    READ /:id -> view
    EDIT /:id/edit -> developer-edit-page
    UPDATE /:id -> 

developers/
    developers.js -> frontend routing
    services.js -> 
    view/
        html/controller
    index/
        htl/controller

http://hireDot/#/developers/:id
                /developers
                /developers/:id/edit
                

- developers/
    + REST
        * Create/Update - Form
        * Read: Portfolio
        * Index: Developer Page
    + favorites/
        * C/U: Add/Minus Favorites
- projects/
- admin/
    + invites/

Testing
- Did not see testing

Deployment
- Did not see significant use of sockets, might consider removing

Workflow
- Good use for feature branching and git merging for workflow
- Saw some use of Github Issues

General Comments:
- Very impressive, this is like the work of a professional team learning Angular and the fullstack generator
