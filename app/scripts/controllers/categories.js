'use strict';

/**
 * @ngdoc function
 * @name proagrocorpAdminFrontendApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the proagrocorpAdminFrontendApp
 */
angular.module('proagrocorpAdminFrontendApp')
.controller('CategoriesCtrl', function ($scope, categoriesService) {
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
    
    $scope.init = function() {
        
    };
    
    $scope.dataForTheTree =
    [
            { "name" : "Joe", "age" : "21", "children" : [
                    { "name" : "Smith", "age" : "42", "children" : [] },
                    { "name" : "Gary", "age" : "21", "children" : [
                            { "name" : "Jenifer", "age" : "23", "children" : [
                                    { "name" : "Dani", "age" : "32", "children" : [] },
                                    { "name" : "Max", "age" : "34", "children" : [] }
                            ]}
                    ]}
            ]},
            { "name" : "Albert", "age" : "33", "children" : [] },
            { "name" : "Ron", "age" : "29", "children" : [] }
    ];
});