'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('CategoriesCtrl', function ($scope, categoriesService, $uibModal, $utilsViewService) {
    $scope.search = {
        estado_id: 1
    };
    
    $scope.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    };
    
    $scope.getCategories = function() {
        $scope.loading = true;
        categoriesService.get(function(data) {
            $scope.categories = data.categories;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getCategories();
    };
    
    $scope.showCategoriesEdit = function(category, event) {        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/categories-edit.html',
            controller: 'CategoriesEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                category: function() {
                    return category;
                }
            }
        });
        
        modalInstanceEdit.result.then(function (data) {
            $scope.getCategories();
            $scope.message = data;
        });
    };
    
    $scope.init();
});