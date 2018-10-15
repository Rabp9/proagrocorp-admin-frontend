'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.slidesService
 * @description
 * # slidesService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.factory('slidesService', function ($resource, envService) {
    return $resource(envService.getHost() + 'slides/:id.json', {}, {
        previewImagen: {
            method: 'POST',
            url: envService.getHost() + 'slides/previewImagen/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: envService.getHost() + 'slides/getAdmin/.json'
        },
        saveMany: {
            method: 'POST',
            url: envService.getHost() + 'slides/saveMany/.json'
        }
    });
});