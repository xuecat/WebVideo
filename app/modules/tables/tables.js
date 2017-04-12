'user strict';

angular.module('app')
.controller('tablesController', ['$scope', '$state','$translate', 'appToggleData',
    function ScopeController($scope, $state, $translate, appToggleData) {
        $scope.toggleView = appToggleData;

        $scope.SelectVideo = function () {
            $state.go('home.video', {
                type: 1, 
                param1: './../data/test.png',
                param2: './../data/test.mp4'
            });
        };
    }
]);

