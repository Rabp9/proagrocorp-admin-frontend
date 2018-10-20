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
    
    $scope.tinymcePagesOptions = {
        toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | fontselect ",
        fontsize_formats: "8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt",
        plugins: 'lists autolink textcolor colorpicker link media preview table code',
        language_url : 'scripts/langs_tinymce/es.js'
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