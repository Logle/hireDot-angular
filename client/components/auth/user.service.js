'use strict';

angular.module('hireDotApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      typeahead: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'typeahead'
        }
      },
      followDeveloper: {
        method: 'POST',
        params: {
          controller:'followDeveloper'
        }
      }
	  });
  });
