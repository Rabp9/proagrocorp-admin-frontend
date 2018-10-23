'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:CategoriesEditCtrl
 * @description
 * # CategoriesEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('CategoriesEditCtrl', function ($scope, categoriesService, category, $q, $uibModalInstance) {
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.getCategory = function(categoriesList) {
        $scope.loading = true;
        categoriesService.get({id: category.id}, function(data) {
            $scope.category = data.category;
                
            var k = -1;
            angular.forEach(categoriesList, function(value, key) {
                if (parseInt(value.id) === parseInt($scope.category.parent_id)) {
                    k = key;
                }
            });
            if (k !== -1) {
                $scope.category.parent_id = categoriesList[k].id;
            }
            
        });
    };
    
    $scope.getCategoriesParent = function() {
        return $q(function(resolve, reject) {
            $scope.loadingCategories = true;
            categoriesService.getTreeList({spacer: '_'}, function(data) {
                $scope.categoriesList = data.categories;
                $scope.loadingCategories = false;
                resolve($scope.categoriesList);
            });
        });
    };
    
    $scope.init = function() {
        $scope.getCategoriesParent().then(function(categoriesList) {
            $scope.getCategory(categoriesList);
        });
    };
    
    $scope.init();
});