'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:SlidesEditCtrl
 * @description
 * # SlidesEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('SlidesEditCtrl', function ($scope, slide, $uibModalInstance, slidesService,
    $rootScope, $utilsViewService) {
        
    $scope.tmpPath = $rootScope.pathLocation + 'img/slides'; 
    $scope.imagenPreview = slide.imagen;
    var tmpPath = $rootScope.pathLocation + 'tmp' + '/';
    var changed = false;
    
    $scope.init = function() {
        $scope.loading = true;
        slidesService.get({id: slide.id}, function(data) {
            $scope.slide = data.slide;
            $scope.imagenPreview = $scope.slide.imagen;
            $scope.slide.imagen = null;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveSlide = function(slide, boton, imagenPreview) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        if (changed) {
            if (imagenPreview !== null) {
                slide.imagen = imagenPreview;
            }
        }
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
            $scope.tmpPath = tmpPath;
            changed = true;
        }, function(err) {
            $scope.imagenPreview = null;
            $scope.loading = false;
        });
    };
    
    $scope.init();
});