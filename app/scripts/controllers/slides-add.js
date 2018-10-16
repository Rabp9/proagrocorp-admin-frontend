'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:SlidesAddCtrl
 * @description
 * # SlidesAddCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('SlidesAddCtrl', function ($scope, $uibModalInstance, slidesService, 
    $rootScope, $utilsViewService) {
    
    $scope.slide = {};
    $scope.tmpPath = $rootScope.pathLocation + 'tmp'; 
    $scope.loading = false;
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveSlide = function(slide, boton, imagen_preview) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
       
        if (imagen_preview !== null) {
            slide.imagen = imagen_preview;
        }
        slide.estado_id = 1;
        slidesService.save(slide, function(data) {
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
        
        slidesService.previewImagen(fd, function(data) {
            $scope.imagenPreview = data.filename;
            $scope.loading = false;
        }, function(data) {
            $scope.imagenPreview = null;
            $scope.loading = false;
        });
    };
});