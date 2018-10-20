'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:CategoriesEditCtrl
 * @description
 * # CategoriesEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('CategoriesEditCtrl', function ($scope, categoriesService) {
    $scope.category = {};
    
    $scope.getCategoriesParent = function() {
        $scope.loadingCategories = true;
        categoriesService.getTreeList({spacer: '_'}, function(data) {
            $scope.categoriesList = data.categories;
            $scope.loadingCategories = false;
            
            angular.forEach(categoriesList, function(value, key) {
                if (parseInt(value.id) === parseInt($scope.category.parent_id)) {
                    k = key;
                }
            });
            if (k !== -1) {
                $scope.category.parent_id = $scope.categoriesList[k].id;
            }
        });
    };
    
    $scope.init = function() {
        $scope.getCategoriesParent();
    };
    
    $scope.init();
});