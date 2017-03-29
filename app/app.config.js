angular.module('app')
.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escapeParameters');//设置安全参数，防止代码插入
    $translateProvider.useCookieStorage();
    $translateProvider.useStaticFilesLoader({
        files: [{
            prefix: '/translate/local-',
            suffix: '.json'
        },]
    });
    $translateProvider.preferredLanguage('en');
}]);