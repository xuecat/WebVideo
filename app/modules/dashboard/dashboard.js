'user strict';

angular
    .module('app')
    .controller('dashboardController', ['$scope','$translate', '$state', 'appToggleData', 
    function ScopeController($scope, $translate, $state, appToggleData) {
        $scope.toggleView = appToggleData;
        $scope.alerts = [{
            type: 'success',
            msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
        }];

        $scope.addAlert = function() {
            $scope.alerts.push({
                msg: 'Another alert!'
            });
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }
]);

