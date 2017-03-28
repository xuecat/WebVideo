angular.module('app')
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