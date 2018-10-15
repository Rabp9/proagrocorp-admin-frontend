'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.oAuthHttpInterceptor
 * @description
 * # oAuthHttpInterceptor
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.factory('oAuthHttpInterceptor', function ($cookies) {
    return {
        request: function (config) {
            config.headers.Authorization = 'Bearer ' + $cookies.get('globalagro-token');
            return config;
        }
    };
});