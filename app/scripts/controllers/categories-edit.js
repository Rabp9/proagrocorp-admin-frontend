'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:CategoriesEditCtrl
 * @description
 * # CategoriesEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('CategoriesEditCtrl', function ($scope, categoriesService, category, $q, $uibModalInstance,
    $rootScope, $utilsViewService) {
    
    $scope.tmpPath = $rootScope.pathLocation + 'img/categories'; 
    $scope.portadaPreview = category.portada;
    var tmpPath = $rootScope.pathLocation + 'tmp' + '/';
    var changed = false;
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.getCategory = function() {
        $scope.loading = true;
        categoriesService.get({id: category.id}, function(data) {
            $scope.category = data.category;
            $scope.portadaPreview = $scope.category.portada;
            $scope.category.portada = null;
            $scope.loading = false;
        });
    };
    
    $scope.getCategoriesParent = function() {
        return $q(function(resolve, reject) {
            $scope.loadingCategories = 'Cargando...';
            categoriesService.getTreeList({spacer: '_'}, function(data) {
                $scope.categoriesList = data.categories;
                $scope.loadingCategories = 'Seleccione uno';
                resolve($scope.categoriesList);
            });
        });
    };
    
    $scope.saveCategory = function(category, boton, portadaPreview) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        if (changed) {
            if (portadaPreview !== null) {
                category.portada = portadaPreview;
            }
        }
        
        categoriesService.save(category, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init = function() {
        $scope.getCategoriesParent().then(function(categoriesList) {
            $scope.getCategory(categoriesList);
        });
    };
    
    $scope.previewPortada = function(portada, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', portada);
        
        categoriesService.previewPortada(fd, function(data) {
            $scope.portadaPreview = data.filename;
            $scope.loading = false;
            $scope.tmpPath = tmpPath;
            changed = true;
        }, function(err) {
            $scope.portadaPreview = null;
            $scope.loading = false;
        });
    };
    
    $scope.init();
});