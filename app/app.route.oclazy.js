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
                    'assets/css/fadetab.css',
                    'assets/css/filemanager-animations.css',
                    'assets/css/filemanager-main.css',
                    'modules/home/home.js',
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
                name: 'filemanager',
                files: [
                    'assets/css/rdash.css',
                    'modules/directives/widget.js',
                    'modules/directives/widget-body.js',
                    'modules/directives/widget-header.js',
                    'modules/directives/widget-footer.js',
                    'modules/filemanager/filemanager.js',
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
        .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/dashboard/dashboard.html',
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
        .state('home.filemanager', {
            url: '/filemanager',
            templateUrl: 'modules/filemanager/filemanager.html',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('filemanager');
                }]
            },
            data: {
                linkTitle: 'A004',
                linkUrl: '/home/filemanager',
            }
        })
        .state('home.video', {
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