angular.module('app').config([
    '$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            modules: [{
                name: 'mainView',
                files: [''],
            }, {
                name: 'errorView',
                files: [''],
            }]
        });
    }
])
.config([
    '$stateProvider', function($stateProvider) {
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'modules/home/index.html',
            controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('errorView');
                }]
            }
        })
        .state('home.dashboard', {})
        .state('home.tables', {})
        .state('/error', {
            url: '/error',
            templateUrl: 'modules/error/index.html',
            controller: 'errorController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('errorView');
                }]
            }
        });
    }
]);