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

         if (toState.name == 'home.dashboard') {
            appToggleData.toggleTablesView = 'anim-slide-left';
            appToggleData.toggleDashboardView = 'anim-slide-left';
        } else if (toState.name == 'home.tables') {
            appToggleData.toggleTablesView = 'anim-slide-right';
            appToggleData.toggleDashboardView = 'anim-slide-right';
        }
     });

     $scope.toggle = true;

     $scope.ToggleSidebar = function() {
         $scope.toggle = !$scope.toggle;
     }
 }
]);