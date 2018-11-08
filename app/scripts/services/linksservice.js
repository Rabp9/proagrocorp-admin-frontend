'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.linksService
 * @description
 * # linksService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
  .factory('linksService', function ($resource, envService) {
    return $resource(envService.getHost() + 'links/:id.json', {}, {
        previewImagen: {
            method: 'POST',
            url: envService.getHost() + 'links/previewImagen/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }
    });
});