'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:CategoriesAddCtrl
 * @description
 * # CategoriesAddCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('CategoriesAddCtrl', function ($scope, categoriesService, $rootScope, $uibModalInstance, $utilsViewService) {
    $scope.category = {};
    $scope.tmpPath = $rootScope.pathLocation + 'tmp';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveCategory = function(category, boton, portadaPreview) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
       
        if (portadaPreview !== null) {
            category.portada = portadaPreview;
        }
        category.estado_id = 1;
        categoriesService.save(category, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.getCategoriesParent = function() {
        $scope.loadingCategories = 'Cargando...';
        categoriesService.getTreeList({spacer: '_'}, function(data) {
            $scope.categoriesList = data.categories;
            $scope.loadingCategories = 'Selecciona uno';
        });
    };
    
    $scope.previewPortada = function(portada, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', portada);
        
        categoriesService.previewPortada(fd, function(data) {
            $scope.portadaPreview = data.filename;
            $scope.loading = false;
        }, function(data) {
            $scope.portadaPreview = null;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getCategoriesParent();
    };
    
    $scope.init();
});