'user strict';

angular.module('app')
.controller('mainController', ['$scope', '$state','$translate',
 function($scope, $state, $translate) {
     $scope.linkPage = $state.current.data;
     $state.transitionTo('home.dashboard');

     $scope.$on('$stateChangeSuccess', 
     function(event, toState, toParams, fromState, fromParams) {
         if (toState) {
            $scope.linkPage = toState.data;
         }
     });

     $scope.toggle = true;

     $scope.ToggleSidebar = function() {
         $scope.toggle = !$scope.toggle;
     }
 }
]);