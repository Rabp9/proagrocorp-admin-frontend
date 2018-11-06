'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:LinksCtrl
 * @description
 * # LinksCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('LinksCtrl', function ($scope, linksService, $utilsViewService, $uibModal) {
    $scope.search = {};
    $scope.search.text = '';
    
    $scope.getLinks = function() {
        $scope.loading = true;
        $scope.links = [];
        linksService.get({
            estado_id: $scope.search.estado_id,
            text: $scope.search.text,
            page: $scope.page,
            items_per_page: $scope.items_per_page
        }, function(data) {
            $scope.links = data.links;
            $scope.pagination = data.pagination;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.search.estado_id = '1';
        $scope.page = 1;
        $scope.items_per_page = 10;
    };
    
    $scope.showLinksAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/links-add.html',
            controller: 'LinksAddCtrl',
            backdrop: false
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getLinks();
            $scope.message = data;
        });
    };
    
    $scope.showLinksEdit = function(link, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/links-edit.html',
            controller: 'LinksEditCtrl',
            backdrop: false,
            resolve: {
                link: function() {
                    return link;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getLinks();
            $scope.message = data;
        });
    };
    
    $scope.showLinksDelete = function(producto) {
        if (confirm('¿Está seguro de deshabilitar el link?')) {
            link.estado_id = 2;
            linksService.save(link, function(data) {
                $scope.message = data;
                $scope.getLinks();
            }, function(error) {
                producto.estado_id = 1;
            });
        }
    };
    
    $scope.$watch('search.estado_id', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getLinks();
    });
    
    $scope.$watch('search.category_id', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getLinks();
    });
    
    $scope.pageChanged = function() {
        $scope.getLinks();
    };
    
    $scope.onChangeItemsPerPage = function() {
        $scope.page = 1;
        $scope.getLinks();
    };
    
    $scope.search = function() {
        $scope.page = 1;
        $scope.getLinks();
    };
    
    $scope.init();    
});