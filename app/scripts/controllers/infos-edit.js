'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:InfosEditCtrl
 * @description
 * # InfosEditCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('InfosEditCtrl', function ($scope, info, $uibModalInstance, infosService,
    $utilsViewService, $rootScope) {
    $scope.info = $.extend(true, {}, info);

    $scope.tmpPath = $rootScope.pathLocation + 'img/infos'; 
    $scope.imagenPreview = $scope.info.valor;
    var tmpPath = $rootScope.pathLocation + 'tmp' + '/';
    var changed = false;
    
    $scope.tinymcePagesOptions = {
        toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | fontselect ",
        fontsize_formats: "8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt",
        plugins: 'lists autolink textcolor colorpicker link media preview table code image',
        language_url : '/scripts/langs_tinymce/es.js',
        file_browser_callback_types: 'image',
        file_browser_callback: function(field_name, url, type, win) {
            $scope.input = field_name;
            $('#flImagen').click();
        }
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveInfo = function(info, boton) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        if (changed) {
            info.changed = true;
        }
        infosService.save(info, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(error) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(error.data);
        });
    };
    
    $scope.upload = function(image, errFiles) {
        var fd = new FormData();
        fd.append('file', image);
        
        infosService.upload(fd, function(data) {
            $scope.url = $scope.tmpPath + data.filename;
            document.getElementById($scope.input).value = $scope.url;
        });
    };
    
    $scope.previewImagen = function(imagen, errFiles) {
        $scope.loadingImagen = true;
        var fd = new FormData();
        fd.append('file', imagen);
        
        infosService.previewImagen(fd, function(data) {
            $scope.imagenPreview = data.filename;
            $scope.info.valor = data.filename;
            $scope.tmpPath = tmpPath;
            changed = true;
            $scope.loadingImagen = false;
        }, function(data) {
            $scope.imagenPreview = null;
            $scope.loadingImagen = false;
        });
    };
});