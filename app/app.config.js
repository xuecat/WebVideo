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
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'modules/home/index.html'
        })
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
])
.config(['$translateProvider', function($translateProvider) { //依赖js没写，明天加
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    $translateProvider.useCookieStorage();
    $translateProvider.useStaticFilesLoader({
        files: [{
            prefix: '/translate/local-',
            suffix: '.json'
        },]
    });
    $translateProvider.preferredLanguage('cn');

}]);