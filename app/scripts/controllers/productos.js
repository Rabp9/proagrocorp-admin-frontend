'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:ProductosCtrl
 * @description
 * # ProductosCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('ProductosCtrl', function ($scope, productosService, $utilsViewService, $uibModal, categoriesService) {
    $scope.search = {};
    $scope.search.text = '';
    
    $scope.getProductos = function() {
        $scope.loading = true;
        $scope.productos = [];
        productosService.get({
            estado_id: $scope.search.estado_id,
            text: $scope.search.text,
            category_id: $scope.search.category_id,
            page: $scope.page,
            items_per_page: $scope.items_per_page
        }, function(data) {
            $scope.productos = data.productos;
            $scope.pagination = data.pagination;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getCategories();
        $scope.search.estado_id = '1';
        $scope.page = 1;
        $scope.items_per_page = 10;
    };
    
    $scope.getCategories = function() {
        $scope.loadingCategories = 'Cargando...';
        categoriesService.getTreeList({spacer: '_'}, function(data) {
            $scope.categories = data.categories;
            $scope.loadingCategories = 'Selecciona uno';
        });
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
    
    $scope.showProductosEdit = function(producto, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/productos-edit.html',
            controller: 'ProductosEditCtrl',
            backdrop: false,
            resolve: {
                producto: function() {
                    return producto;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getProductos();
            $scope.message = data;
        });
    };
    
    $scope.showProductosDelete = function(producto) {
        if (confirm('¿Está seguro de deshabilitar el producto?')) {
            $scope.loading = true;
            producto.estado_id = 2;
            productosService.save(producto, function(data) {
                $scope.message = data;
                $scope.getProductos();
                $scope.loading = false;
            }, function(error) {
                producto.estado_id = 1;
            });
        }
    };
    
    $scope.showProductosActivate = function(producto) {
        if (confirm('¿Está seguro de habilitar el producto?')) {
            $scope.loading = true;
            producto.estado_id = 1;
            productosService.save(producto, function(data) {
                $scope.message = data;
                $scope.getProductos();
                $scope.loading = false;
            }, function(error) {
                link.estado_id = 2;
            });
        }
    };
    
    $scope.$watch('search.estado_id', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getProductos();
    });
    
    $scope.$watch('search.category_id', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getProductos();
    });
    
    $scope.pageChanged = function() {
        $scope.getProductos();
    };
    
    $scope.onChangeItemsPerPage = function() {
        $scope.page = 1;
        $scope.getProductos();
    };
    
    $scope.search = function() {
        $scope.page = 1;
        $scope.getProductos();
    };
    
    $scope.init();    
});