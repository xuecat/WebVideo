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
    // $scope.$on('$stateChangeStart', 
    // function(event, toState, toParams, fromState, fromParams) {
    //     if (fromState.name && fromState.name != "home" && toState.name == "home.dashboard") {
    //         appToggleData.toggleDashboardView = 'anim-slide-right';
    //         appToggleData.toggleTablesView = 'anim-slide-left';
    //         appToggleData.toggleVideoView = 'anim-slide-left';
    //     } else if (fromState.name == "home.dashboard") {
    //         appToggleData.toggleTablesView = 'anim-slide-left';
    //         appToggleData.toggleDashboardView = 'anim-slide-right';
    //     }
    // });

     $scope.toggle = true;

     $scope.ToggleSidebar = function() {
         $scope.toggle = !$scope.toggle;
     }
 }
]);