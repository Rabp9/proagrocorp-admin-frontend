'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:UsersEditCtrl
 * @description
 * # UsersEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('UsersEditCtrl', function ($scope, user, $uibModalInstance, usersService, 
    rolesService, $utilsViewService) {
        
    $scope.init = function() {
        usersService.get({id: user.id}, function(data) {
            $scope.user = data.user;
            rolesService.get(function(data) {
                $scope.roles = data.roles;
            });
        });
    };
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveUser = function(user, boton) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        usersService.save(user, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
        $('#' + boton).text('Guardar');
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});