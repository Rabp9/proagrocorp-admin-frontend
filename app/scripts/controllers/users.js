'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
  .controller('UsersCtrl', function ($scope, usersService, $uibModal, $utilsViewService) {
    
    $scope.search = {};
    $scope.search.estado_id = '1';
    
    $scope.getUsers = function() {
        $scope.loading = true;
        usersService.getAdmin(function(data) {
            $scope.users = data.users;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getUsers();
    };
    
    $scope.showUsersAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/users-add.html',
            controller: 'UsersAddCtrl',
            backdrop: false
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getUsers();
            $scope.message = data;
        });
    };
    
    $scope.showUsersEdit = function(user, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/users-edit.html',
            controller: 'UsersEditCtrl',
            backdrop: false,
            resolve: {
                user: function() {
                    return user;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function (data) {
            $scope.getUsers();
            $scope.message = data;
        });
    };
    
    $scope.showUsersDelete = function(user) {
        if (confirm('¿Está seguro de deshabilitar el usuario?')) {
            user.estado_id = 2;
            usersService.save(user, function(data) {
                $scope.message = data;
            }, function(error) {
                user.estado_id = 1;
            });
        }
    };
    
    $scope.showUsersActivate = function(user) {
        if (confirm('¿Está seguro de activar el rol?')) {
            user.estado_id = 1;
            usersService.save(user, function(data) {
                $scope.message = data;
            }, function(error) {
                user.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});