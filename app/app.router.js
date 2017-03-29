angular.module('app')
.config([
    '$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            modules: [{
                abstract: true,
                name: '',
                files: [''],
            }, {
                name: '',
                files: [''],
            }]
        });
    }
]);