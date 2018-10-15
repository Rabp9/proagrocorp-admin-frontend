'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:UsersLoginCtrl
 * @description
 * # UsersLoginCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('UsersLoginCtrl', function ($scope, usersService, $cookies, $location, 
    $rootScope, $utilsViewService) {
    
    $scope.loginUser = function(user, boton) {
        $('#' + boton).text('Login...');
        $utilsViewService.disable('#' + boton);
        
        usersService.login(user, function(data) {
            if (!data.user) {
                $scope.message = data.message;
            } else {
                $cookies.putObject('globalagro-user', data.user);
                $cookies.put('globalagro-token', data.token);
                $rootScope.user = data.user;
                $('#wrapper').removeClass('inLogin');
                $location.path('/');
            }
        }, function(error) {
            $scope.message = error.data;
        });
    };
    
});