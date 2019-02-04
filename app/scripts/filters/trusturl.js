'use strict';

/**
 * @ngdoc filter
 * @name proagrocorpAdminFrontendApp.filter:trustUrl
 * @function
 * @description
 * # trustUrl
 * Filter in the proagrocorpAdminFrontendApp.
 */
angular.module('proagrocorpAdminFrontendApp')
.filter('trustUrl', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
});