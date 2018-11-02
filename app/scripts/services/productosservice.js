'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.productosService
 * @description
 * # productosService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.factory('productosService', function ($resource, envService) {
    return $resource(envService.getHost() + 'productos/:id.json', {}, {
        previewImagen: {
            method: 'POST',
            url: envService.getHost() + 'productos/previewImagen/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }
    });
});