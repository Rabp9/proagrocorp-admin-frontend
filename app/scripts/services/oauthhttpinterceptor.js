'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.oAuthHttpInterceptor
 * @description
 * # oAuthHttpInterceptor
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
  .factory('oAuthHttpInterceptor', function () {
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
