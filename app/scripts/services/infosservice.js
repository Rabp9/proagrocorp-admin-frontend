'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.infosService
 * @description
 * # infosService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.factory('infosService', function($resource, envService) {
    return $resource(envService.getHost() + 'infos/:id.json', {}, {
        getMany: {
            method: 'POST',
            url: envService.getHost() + 'infos/getMany.json',
        },
        indexAdmin: {
            method: 'POST',
            url: envService.getHost() + 'infos/indexAdmin.json',
        }
    });
});