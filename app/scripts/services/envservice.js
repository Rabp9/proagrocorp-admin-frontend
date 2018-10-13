'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.envService
 * @description
 * # envService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
  .factory('envService', function () {
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
