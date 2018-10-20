'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.productosService
 * @description
 * # productosService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
  .factory('productosService', function () {
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
