'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:SlidesCtrl
 * @description
 * # SlidesCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('SlidesCtrl', function ($scope, slidesService, $uibModal, $utilsViewService) {
    
    $scope.getSlides = function() {
        $scope.loading = true;
        slidesService.getAdmin(function(data) {
            $scope.slides = data.slides;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getSlides();
    };
    
    $scope.sortableOptions = {
        'ui-floating': true,
        stop: function(e, ui) {
            for (var index in $scope.slides) {
                $scope.slides[index].orden = index;
            }
        }
    };
    
    $scope.saveOrden = function(slides, event) {
        $utilsViewService.disable(event.currentTarget);
        
        slidesService.saveMany({slides: slides}, function (data) {
            $scope.message = data;
            $utilsViewService.enable(event.currentTarget);
        }, function(err) {
            $scope.message = err.data;
            $utilsViewService.enable(event.currentTarget);
        });
    };
  
    $scope.showSlidesAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/slides-add.html',
            controller: 'SlidesAddCtrl',
            backdrop: false
        });
        
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getSlides();
            $scope.message = data;
        });
    };
        
    $scope.showSlidesEdit = function(slide) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/slides-edit.html',
            controller: 'SlidesEditCtrl',
            backdrop: false,
            resolve: {
                slide: function() {
                    return slide;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
           
        modalInstanceEdit.result.then(function (data) {
            $scope.getSlides();
            $scope.message = data;
        });
    };
    
    $scope.init();
});