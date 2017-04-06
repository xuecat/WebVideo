'user strict';

angular.module('app')
.controller('tablesController', ['$scope', '$state','$translate', 'appToggleData',
    function ScopeController($scope, $state, $translate, appToggleData) {
        $scope.toggleView = appToggleData;
    }
]);

