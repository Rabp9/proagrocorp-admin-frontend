'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:RolesAddCtrl
 * @description
 * # RolesAddCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('RolesAddCtrl', function ($scope, rolesService, $uibModalInstance, 
    controllersService, $utilsViewService) {
        
    $scope.rol = {};
    $scope.rol.controller_roles = [];
    
    $scope.init = function() {
        $scope.loading = true;
        controllersService.get(function(data) {
            $scope.rol.controller_roles = [];
            angular.forEach(data.controllers, function(value, key) {
                $scope.rol.controller_roles.push({
                    controller_id: value.id,
                    controller: value,
                    permiso: false
                });
            });
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRol = function(rol, boton) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        rol.estado_id = 1;
        rolesService.save(rol, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});