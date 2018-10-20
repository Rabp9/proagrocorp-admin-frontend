'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.categoriesService
 * @description
 * # categoriesService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.factory('categoriesService', function ($resource, envService) {
    return $resource(envService.getHost() + 'categories/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: envService.getHost() + 'categories/getAdmin/.json'
        },
        getTreeList: {
            method: 'GET',
            url: envService.getHost() + 'categories/getTreeList/:spacer.json'
        }
    });
});