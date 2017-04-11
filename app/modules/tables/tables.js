'user strict';

angular.module('app')
.controller('tablesController', ['$scope', '$state','$translate', 'appToggleData',
    function ScopeController($scope, $state, $translate, appToggleData) {
        $scope.toggleView = appToggleData;

        $scope.SelectVideo = function () {
            $state.go('home.video', {
                type: '2', 
                param1: '22',
                param2: '44'
            });
        };
    }
]);

