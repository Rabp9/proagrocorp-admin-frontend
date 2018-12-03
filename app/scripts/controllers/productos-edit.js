'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:ProductosEditCtrl
 * @description
 * # ProductosEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('ProductosEditCtrl', function ($scope, producto, $uibModalInstance, productosService,
    $rootScope, $utilsViewService, categoriesService, $q) {
        
    $scope.tmpPathImagen = $rootScope.pathLocation + 'img/productos';
    $scope.tmpPathFichaTecnica = $rootScope.pathLocation + 'files/fichas';
    $scope.imagenPreview = producto.imagen;
    $scope.fichaTecnicaPreview = producto.fichaTecnica;
    var tmpPath = $rootScope.pathLocation + 'tmp' + '/';
    var changedImagen = false;
    var changedFichaTecnica = false;
    
    $scope.init = function() {
        $scope.getCategories().then(function(categories) {
            $scope.getProducto(categories);
        });
    };
    
    $scope.getProducto = function() {
        $scope.loading = true;
        $scope.getCategories();
        productosService.get({id: producto.id}, function(data) {
            $scope.producto = data.producto;
            $scope.imagenPreview = $scope.producto.imagen;
            $scope.fichaTecnica = $scope.producto.fichaTecnica;
            $scope.producto.imagen = null;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveProducto = function(producto, boton, imagenPreview, fichaTecnicaPreview) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        if (changedImagen) {
            if (imagenPreview !== null) {
                producto.imagen = imagenPreview;
                producto.changedImagen = true;
            }
        }
        if (changedFichaTecnica) {
            if (fichaTecnicaPreview !== null) {
                producto.fichaTecnica = fichaTecnicaPreview;
                producto.changedFichaTecnica = true;
            }
        }
        productosService.save(producto, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.previewImagen = function(imagen, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', imagen);
        
        productosService.previewImagen(fd, function(data) {
            $scope.imagenPreview = data.filename;
            $scope.loading = false;
            $scope.tmpPathImagen = tmpPath;
            changedImagen = true;
        }, function(err) {
            $scope.imagenPreview = null;
            $scope.loading = false;
        });
    };
    
    $scope.previewFichaTecnica = function(fichaTecnica, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', fichaTecnica);
        
        productosService.previewFichaTecnica(fd, function(data) {
            $scope.fichaTecnicaPreview = data.filename;
            $scope.loadingFichaTecnica = false;
            $scope.tmpPathFichaTecnica = tmpPath;
            changedFichaTecnica = true;
        }, function(err) {
            $scope.fichaTecnicaPreview = null;
            $scope.loadingFichaTecnica = false;
        });
    };
    
    $scope.getCategories = function() {
        return $q(function(resolve, reject) {
            $scope.loadingCategories = 'Cargando...';
            categoriesService.getTreeList({spacer: '_'}, function(data) {
                $scope.categories = data.categories;
                $scope.loadingCategories = 'Seleccione uno';
                resolve($scope.categories);
            });
        });
    };
    
    $scope.init();
});