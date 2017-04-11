'user strict';

angular.module('app')
.controller('mainController', ['$scope', '$state','$translate', 'appToggleData', 'appAllConst',
 function($scope, $state, $translate, appToggleData,appAllConst) {
     $scope.linkPage = $state.current.data;
     $state.transitionTo('home.dashboard');

     $scope.$on('$stateChangeSuccess', 
     function(event, toState, toParams, fromState, fromParams) {
         if (toState) {
            $scope.linkPage = toState.data;
         }
     });

    //  $scope.$on('$viewContentLoaded', function(event, a, b, c, d) {
    //  });
    $scope.switchView = function (nview) {
        if (nview == 0) {
            appToggleData.toggleTablesView = 'anim-slide-left';
            appToggleData.toggleDashboardView = 'anim-slide-right';
        } else if (nview == 1) {
            appToggleData.toggleTablesView = 'anim-slide-left';
            appToggleData.toggleDashboardView = 'anim-slide-right';
        }
    }

     $scope.toggle = true;

     $scope.ToggleSidebar = function() {
         $scope.toggle = !$scope.toggle;
     }
 }
]);