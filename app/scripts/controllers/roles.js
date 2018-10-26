'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:RolesCtrl
 * @description
 * # RolesCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('RolesCtrl', function ($scope, rolesService, $uibModal, $utilsViewService) {
    
    $scope.search = {};
    $scope.search.estado_id = '1';
    
    $scope.getAdmin = function() {
        $scope.loading = true;
        rolesService.getAdmin(function(data) {
            $scope.roles = data.roles;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getAdmin();
    };
    
    $scope.showRolesAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/roles-add.html',
            controller: 'RolesAddCtrl',
            backdrop: false
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getAdmin();
            $scope.message = data;
        });
    };
    
    $scope.showRolesEdit = function(rol, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/roles-edit.html',
            controller: 'RolesEditCtrl',
            backdrop: false,
            resolve: {
                rol: function() {
                    return rol;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function (data) {
            $scope.getAdmin();
            $scope.message = data;
        });
    };
    
    $scope.showRolesDelete = function(rol) {
        if (confirm('¿Está seguro de deshabilitar el rol?')) {
            rol.estado_id = 2;
            rolesService.save(rol, function(data) {
                $scope.message = data;
            }, function(error) {
                rol.estado_id = 1;
            });
        }
    };
    
    $scope.showRolesActivate = function(rol) {
        if (confirm('¿Está seguro de activar el rol?')) {
            rol.estado_id = 1;
            rolesService.save(rol, function(data) {
                $scope.message = data;
            }, function(error) {
                rol.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});