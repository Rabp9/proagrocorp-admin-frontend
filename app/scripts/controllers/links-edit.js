'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:LinksEditCtrl
 * @description
 * # LinksEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('LinksEditCtrl', function ($scope, link, $uibModalInstance, linksService,
    $rootScope, $utilsViewService, $q) {
        
    $scope.ubicaciones = ['header', 'footer'];
    $scope.tmpPath = $rootScope.pathLocation + 'img/links'; 
    $scope.imagenPreview = link.imagen;
    var tmpPath = $rootScope.pathLocation + 'tmp' + '/';
    var changed = false;
    
    $scope.init = function() {
        $scope.getLink();
    };
    
    $scope.getLink = function() {
        $scope.loading = true;
        linksService.get({id: link.id}, function(data) {
            $scope.link = data.link;
            $scope.imagenPreview = $scope.link.imagen;
            $scope.link.imagen = null;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveLink = function(link, boton, imagenPreview) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        if (changed) {
            if (imagenPreview !== null) {
                link.imagen = imagenPreview;
                link.changed = true;
            }
        }
        linksService.save(link, function(data) {
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
        
        linksService.previewImagen(fd, function(data) {
            $scope.imagenPreview = data.filename;
            $scope.loading = false;
            $scope.tmpPath = tmpPath;
            changed = true;
        }, function(err) {
            $scope.imagenPreview = null;
            $scope.loading = false;
        });
    };
        
    $scope.init();
});