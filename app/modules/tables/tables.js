'user strict';

angular.module('app')
.controller('tablesController', ['$scope', '$state','$translate', 'appToggleData',
    function ScopeController($scope, $state, $translate, appToggleData) {
        $scope.toggleView = appToggleData;

        $scope.SelectVideo = function () {
            $state.go('home.video', {type: '', param1: '', param2: ''});
        };
    }
]);

