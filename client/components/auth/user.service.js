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
        method: 'get',
        isArray: true,
        params: {
          controller:'typeahead'
        }
      }
	  });
  });
