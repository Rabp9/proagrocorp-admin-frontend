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
    
    $scope.$watch('search.estado_id', function(oldValue, newValue) {
        $scope.getCategories();
    });
        
    $scope.getCategories = function() {
        $scope.loading = true;
        categoriesService.get({estado_id: $scope.search.estado_id}, function(data) {
            $scope.categories = data.categories;
            $scope.loading = false;
        });
    };
    
    $scope.showCategoriesAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/categories-add.html',
            controller: 'CategoriesAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getCategories();
            $scope.message = data;
        });
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
    
    $scope.init = function() {
        $scope.getCategories();
    };
    
    $scope.init();
});