angular.module('app')
.config([
    '$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            modules: [{
                name: 'mainView',
                files: [
                    'lib/translate/angular-translate.js',
                    'lib/translate/angular-translate-storage-local.js',
                    'lib/translate/angular-translate-storage-cookie.js',
                    'lib/translate/angular-translate-loader-static-files.js',
                    ],
            }, {
                name: 'errorView',
                files: [
                    'error/errorpage.js',
                    'assets/css/erropage.css',
                    ],
            }, {
                name: 'dashboard',
                files: [
                    'dashboard/dashboard.js'
                ],
            }, {
                name: 'tables',
                files: [
                    'tables/tables.js'
                ],
            }]
        });
    }
])
.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/error');

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'modules/home/home.html',
            controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('errorView');
                }]
            },
            data: {
                linkTitle: 'A000',
                linkUrl: '/home',
            }
        })
        .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/dashboard/dashboard.html',
            controller: 'dashboardController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('dashboard');
                }]
            },
            data: {
                linkTitle: 'A003',
                linkUrl: '/home/dashboard',
            }
        })
        .state('home.tables', {
            url: '/tables',
            templateUrl: 'modules/tables/tables.html',
            controller: 'tablesController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('tables');
                }]
            },
            data: {
                linkTitle: 'A004',
                linkUrl: '/home/tables',
            }
        })
        .state('/error', {
            url: '/error',
            templateUrl: 'modules/error/errorpage.html',
            controller: 'errorController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('errorView');
                }]
            }
        });
    }
]);