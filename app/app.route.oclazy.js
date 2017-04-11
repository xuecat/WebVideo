'user strict';

angular.module('app')
.config([
    '$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            modules: [{
                name: 'mainView',
                files: [
                    'assets/css/rdash.css',
                    'assets/css/font-awesome.css',
                    'modules/home/home.js'
                    ],
            }, {
                name: 'errorView',
                files: [
                    'assets/css/erropage.css',
                    'error/errorpage.js',
                    ],
            }, {
                name: 'dashboard',
                files: [
                    'assets/css/rdash.css',
                    'modules/directives/widget.js',
                    'modules/directives/widget-body.js',
                    'modules/dashboard/dashboard.js',
                ],
            }, {
                name: 'tables',
                files: [
                    'assets/css/rdash.css',
                    'modules/directives/widget.js',
                    'modules/directives/widget-body.js',
                    'modules/directives/widget-header.js',
                    'modules/directives/widget-footer.js',
                    'modules/tables/tables.js',
                ],
            }, {
                name: 'video',
                files: [
                    'modules/video/video.js',
                ],
            }]
        });
    }
])
.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/error');
        $urlRouterProvider.when('/', '/home');
        $urlRouterProvider.when('', '/home');

        $stateProvider
        .state('home', {
            //abstract: true,
            url: '/home',
            templateUrl: 'modules/home/home.html',
            controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('mainView');
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
        .state('home.video', {
            url: '/video',
            templateUrl: 'modules/video/video.html',
            controller: 'videoController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('video');
                }]
            },
            data: {
                linkTitle: 'A007',
                linkUrl: '/home/video',
            }
        })
        .state('/error', {
            url: '/error',
            templateUrl: 'error/errorpage.html',
            controller: 'errorController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('errorView');
                }]
            }
        });
    }
]);