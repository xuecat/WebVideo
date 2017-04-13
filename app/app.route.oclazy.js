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
                    'modules/home/home.js',
                    'modules/directives/widget.js',
                    'modules/directives/widget-body.js',
                    'modules/dashboard/dashboard.js',
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
                    'assets/css/videoskin-js.css',
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
        .state('home.list', {
            url: '/list',
            views: {
                'sidebar@home': {
                    templateUrl: 'modules/home/sidebartable.html',
                }
            },
            data: {
                linkTitle: 'A008',
                linkUrl: '/home/list',
            }
        })
        .state('home.filetree', {
            url: '/filetree',
            views: {
                'sidebar@home': {
                    templateUrl: 'modules/filemanager/sidebartree.html',
                }
            },
            data: {
                linkTitle: 'A009',
                linkUrl: '/home/filetree',
            }
        })
        .state('home.list.dashboard', {
            url: '/dashboard',
            views: {
                'body@home': {
                    templateUrl: 'modules/dashboard/dashboard.html',
                    controller: 'dashboardController',
                }
            },
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
        .state('home.list.tables', {
            url: '/tables',
            views: {
                'body@home': {
                    templateUrl: 'modules/tables/tables.html',
                    controller: 'tablesController',
                }
            },
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
        .state('home.list.video', {
            url: '/video/:type/video?param1&param2',//格式，图片，视频
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