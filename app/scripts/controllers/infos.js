'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:InfosCtrl
 * @description
 * # InfosCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('InfosCtrl', function ($scope, infosService, $uibModal, $utilsViewService) {
    var search = ['logo', 'descripcion', 'video', 'copyright', 'nosotros', 'bg_descripcion', 'bg_nosotros',  'bg_contacto'];
    
    $scope.getInfos = function() {
        $scope.loading = true;
        infosService.indexAdmin(search, function(data) {
            $scope.infos = data.infos;
            $scope.loading = false;
        }); 
    };
    
    $scope.init = function() {
        $scope.getInfos();
    };
    
    $scope.showInfosEdit = function(info, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/infos-edit.html',
            controller: 'InfosEditCtrl',
            backdrop: false,
            resolve: {
                info: function() {
                    return info;
                }
            }
        });
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function (data) {
            $scope.getInfos();
            $scope.message = data;
        });
    };
    
    $scope.init();
});