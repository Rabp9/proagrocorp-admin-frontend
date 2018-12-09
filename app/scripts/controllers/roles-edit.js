'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:RolesEditCtrl
 * @description
 * # RolesEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('RolesEditCtrl', function ($scope, rol, $uibModalInstance, rolesService,
    $utilsViewService) {
    
    $scope.init = function() {
        $scope.getRol();
    };
    
    $scope.getRol = function() {
        $scope.loading = true;
        rolesService.get({id: rol.id}, function(data) {
            $scope.rol = data.rol;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRol = function(rol, boton) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        rolesService.save(rol, function(data) {
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