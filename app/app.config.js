'user strict';
angular.module('app')
.config(['$translateProvider', function($translateProvider) {
    
    $translateProvider.useSanitizeValueStrategy('escapeParameters');//设置安全参数，防止代码插入
    $translateProvider.useStaticFilesLoader({
        files: [{
            prefix: '/translate/local-',
            suffix: '.json'
        },]
    });
    $translateProvider.preferredLanguage('en');
}])
.constant('appAllConst', {'LEFT_VIEW': 0, 'RIGHT_VIEW': 1,})
.value('appToggleData', {toggleTablesView: 'anim-slide-left', toggleDashboardView: 'anim-slide-left'});