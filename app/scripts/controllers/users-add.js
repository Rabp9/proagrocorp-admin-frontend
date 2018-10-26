'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:UsersAddCtrl
 * @description
 * # UsersAddCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('UsersAddCtrl', function ($scope, usersService, rolesService, $uibModalInstance, 
    $utilsViewService) {
        
    $scope.user = {};
    
    $scope.init = function() {
        $scope.loading = true;
        rolesService.get(function(data) {
            $scope.roles = data.roles;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveUser = function(user, boton) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);

        user.estado_id = 1;
        usersService.save(user, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});