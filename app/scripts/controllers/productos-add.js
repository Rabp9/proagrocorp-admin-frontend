'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:ProductosAddCtrl
 * @description
 * # ProductosAddCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('ProductosAddCtrl', function ($scope, $rootScope, $uibModalInstance,
    $utilsViewService, productosService, categoriesService) {
        
    $scope.producto = {};
    $scope.tmpPath = $rootScope.pathLocation + 'tmp';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveProducto = function(producto, boton, imagenPreview) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
       
        if (imagenPreview === undefined) {
            alert('Debes seleccionar una imagen.');
            $utilsViewService.enable('#' + boton);
            $('#' + boton).text('Guardar');
            return;
        } else {
            producto.imagen = imagenPreview;
            producto.changed = true;
        }
        
        producto.estado_id = 1;
        productosService.save(producto, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.getCategories = function() {
        $scope.loadingCategories = 'Cargando...';
        categoriesService.getTreeList({spacer: '_'}, function(data) {
            $scope.categories = data.categories;
            $scope.loadingCategories = 'Selecciona uno';
        });
    };
    
    $scope.previewImagen = function(imagen, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', imagen);
        
        productosService.previewImagen(fd, function(data) {
            $scope.imagenPreview = data.filename;
            $scope.loading = false;
        }, function(data) {
            $scope.imagenPreview = null;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getCategories();
    };
    
    $scope.init();
});