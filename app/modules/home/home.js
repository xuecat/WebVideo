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
            appToggleData.toggleChildView = appAllConst.LEFT_VIEW;
        } else if (toState.name == 'home.tables') {
            appToggleData.toggleChildView = appAllConst.RIGHT_VIEW;
        }
     });

     $scope.toggle = true;

     $scope.ToggleSidebar = function() {
         $scope.toggle = !$scope.toggle;
     }
 }
]);