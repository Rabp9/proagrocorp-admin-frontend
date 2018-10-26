'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.controllersService
 * @description
 * # controllersService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.factory('controllersService', function ($resource, envService) {
    return $resource(envService.getHost() + 'controllers/:id.json', {});
});