'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.usersService
 * @description
 * # usersService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
  .factory('usersService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
