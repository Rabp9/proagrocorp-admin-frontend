'use strict';

/**
 * @ngdoc service
 * @name proagrocorpAdminFrontendApp.envService
 * @description
 * # envService
 * Factory in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.factory('envService', function () {
    return {
        getHost: function() {
            switch (window.location.hostname) {
                case 'localhost':
                    return 'http://localhost:8000/proagrocorp-backend/';
            }
        }
    };
});