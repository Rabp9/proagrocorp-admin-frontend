'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.rolesService
 * @description
 * # rolesService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.factory('rolesService', function ($resource, envService) {
    return $resource(envService.getHost() + 'roles/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: envService.getHost() + 'roles/getAdmin/.json'
        }
    });
});