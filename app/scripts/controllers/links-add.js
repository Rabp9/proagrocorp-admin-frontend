'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:LinksAddCtrl
 * @description
 * # LinksAddCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('LinksAddCtrl', function ($scope, $rootScope, $uibModalInstance,
    $utilsViewService, linksService) {
        
    $scope.producto = {};
    $scope.ubicaciones = ['header', 'footer'];
    $scope.tmpPath = $rootScope.pathLocation + 'tmp';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveLink = function(link, boton, imagenPreview) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
              
        if (imagenPreview === undefined) {
            alert('Debes seleccionar una imagen.');
            $utilsViewService.enable('#' + boton);
            $('#' + boton).text('Guardar');
            return;
        } else {
            link.imagen = imagenPreview;
            link.changed = true;
        }
        
        link.estado_id = 1;
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
        }, function(data) {
            $scope.imagenPreview = null;
            $scope.loading = false;
        });
    };
});