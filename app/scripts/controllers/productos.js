'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:ProductosCtrl
 * @description
 * # ProductosCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('ProductosCtrl', function ($scope, productosService, $utilsViewService, $uibModal) {
    $scope.search = {};
    $scope.search.estado_id = '1';
    
    $scope.getProductos = function() {
        $scope.loading = true;
        productosService.getAdmin(function(data) {
            $scope.productos = data.productos;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getUsers();
    };
    
    $scope.showProductosAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/productos-add.html',
            controller: 'ProductosAddCtrl',
            backdrop: false
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getProductos();
            $scope.message = data;
        });
    };
});