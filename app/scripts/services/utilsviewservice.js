'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.utilsViewService
 * @description
 * # utilsViewService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
  .factory('utilsViewService', function () {
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
