'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.linksService
 * @description
 * # linksService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
  .factory('linksService', function () {
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
