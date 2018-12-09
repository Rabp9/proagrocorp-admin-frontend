'use strict';

/**
 * @ngdoc overview
 * @name proagrocorpAdminFrontendApp
 * @description
 * # proagrocorpAdminFrontendApp
 *
 * Main module of the application.
 */
angular
.module('proagrocorpAdminFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngFileUpload',
    'ui.tinymce',
    'ui.sortable',
    'thatisuday.ng-image-gallery',
    'angularValidator',
    'scrollable-table',
    'ui.router',
    'angular-toArrayFilter',
    'treeControl'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('oAuthHttpInterceptor');
    var mainState = {
        name: 'main',
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        title: 'Home'
    };  
    
    var infosState = {
        name: 'infos',
        url: '/infos',
        templateUrl: 'views/infos.html',
        controller: 'InfosCtrl',
        controllerAs: 'infos',
        title: 'Información General'
    };
    
    var slidesState = {
        name: 'slides',
        url: '/slides',
        templateUrl: 'views/slides.html',
        controller: 'SlidesCtrl',
        controllerAs: 'slides',
        title: 'Slides'
    };
    
    var usersLoginState = {
        name: 'users-login',
        url: '/users-login',
        templateUrl: 'views/users-login.html',
        controller: 'UsersLoginCtrl',
        controllerAs: 'users-login',
        title: 'Login'
    };
        
    var categoriesState = {
        name: 'categories',
        url: '/categories',
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'categories',
        title: 'Categorías'
    };
    
    var productosState = {
        name: 'productos',
        url: '/productos',
        templateUrl: 'views/productos.html',
        controller: 'ProductosCtrl',
        controllerAs: 'productos',
        title: 'Productos'
    };
    
    var nosotrosState = {
        name: 'nosotros',
        url: '/nosotros',
        templateUrl: 'views/nosotros.html',
        controller: 'NosotrosCtrl',
        controllerAs: 'nosotros',
        title: 'Nosotros'
    };
    
    var linksState = {
        name: 'links',
        url: '/links',
        templateUrl: 'views/links.html',
        controller: 'LinksCtrl',
        controllerAs: 'links',
        title: 'Links'
    };
    
    var usersState = {
        name: 'users',
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users',
        title: 'Usuarios'
    };
    
    var rolesState = {
        name: 'roles',
        url: '/roles',
        templateUrl: 'views/roles.html',
        controller: 'RolesCtrl',
        controllerAs: 'roles',
        title: 'Roles'
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(infosState);
    $stateProvider.state(slidesState);
    $stateProvider.state(usersLoginState);
    $stateProvider.state(categoriesState);
    $stateProvider.state(productosState);
    $stateProvider.state(nosotrosState);
    $stateProvider.state(linksState);
    $stateProvider.state(usersState);
    $stateProvider.state(rolesState);
    $urlRouterProvider.when('', '/');
})
.run(function($rootScope, $state, $cookies, $location, $window, envService) {
    angular.module('proagrocorpAdminFrontendApp').pathLocation = envService.getHost();
    $rootScope.pathLocation = envService.getHost();
    
    $('#dvMessageRoot').removeClass('dvHidden');
    $rootScope.tinymceOptions = {
        toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | fontselect ",
        fontsize_formats: "8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt",
        plugins: 'lists autolink textcolor colorpicker link media preview table code',
        language_url : 'scripts/langs_tinymce/es.js'
    };
    $('.nav a').on('click', function(){
        $('.navbar-toggle').click();
    });
    
    $rootScope.$state = $state;
    
    if ($cookies.get('globalagro-token')) {
        $rootScope.logged = true;
        $rootScope.user = $cookies.getObject('globalagro-user');
    } else {
        $rootScope.logged = false;
    }
    
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams, options) {
        if (fromState.name === '' && toState.name === 'users-login') {
            $('#topbar-wrapper').addClass('ng-hide');
            $('#wrapper').addClass('inLogin');
            if ($rootScope.user !== undefined) {
                $location.path('/');
            }
        } else if (fromState.name === ''  && toState.name !== 'users-login') {
            $('#sidebar-wrapper').css('display', 'block');
            $('#wrapper').addClass('toggled');
            if ($rootScope.user === undefined) {
                $('#sidebar-wrapper').css('display', 'none');
                $('#wrapper').removeClass('toggled');
                $location.path('/users-login');
            }
        } else if (fromState.name !== 'users-login' && toState.name === 'users-login') {
            if ($rootScope.user !== undefined) {
                $location.path('/');
            } else {
                $('#sidebar-wrapper').css('display', 'none');
                $('#wrapper').removeClass('toggled');
            }
        } else if (fromState.name === 'users-login' && toState.name !== 'users-login') {
            if ($rootScope.user === undefined) {
                $location.path('/users-login');
            } else {
                $('#topbar-wrapper').removeClass('ng-hide');
                $('#sidebar-wrapper').css('display', 'block');
                $('#wrapper').addClass('toggled');
            }
        }
        if ($rootScope.user !== undefined) {
            if ($rootScope.user.rol.permisos.search(toState.name) >= 0) {
                $rootScope.messageRoot = null;
            } else {
                if (toState.name !== 'main' && toState.name !== 'users-login') {
                    event.preventDefault();
                    $rootScope.messageRoot = {
                        type: 'error',
                        text: 'No tiene permisos'
                    };
                }
            }
        }
    });
    
    $rootScope.$on('$stateChangeSuccess', 
    function(event, toState, toParams, fromState, fromParams){ 
        $rootScope.title = toState.title;
    });

    $rootScope.logout = function() {
        if (confirm('¿Está seguro de cerrar sesión?')) {
            $cookies.remove('globalagro-user');
            $cookies.remove('globalagro-token');
            $rootScope.user = undefined;
            $('#topbar-wrapper').addClass('ng-hide');
            $('#wrapper').addClass('inLogin');
            $rootScope.message_root = [];
            $location.path('/users-login');
        }
    };
});
