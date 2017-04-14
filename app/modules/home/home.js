'user strict';

angular.module('app')
.controller('mainController', ['$scope', '$state','$translate', 'appToggleData', 'appAllConst','viewFactory', 
 function($scope, $state, $translate, appToggleData,appAllConst, viewFactory) {
     $scope.linkPage = $state.current.data;
     
     $state.transitionTo('home.dashboard');

     $scope.$on('$stateChangeSuccess', 
     function(event, toState, toParams, fromState, fromParams) {
         $state;
         if (toState) {
            $scope.linkTitle = $translate.instant(toState.data.linkTitle);
            $scope.linkUrl = toState.data.linkUrl;

            if (toState.name.indexOf('dashboard') != -1) {
                viewFactory.right = 'dashboard';
            } else if (toState.name.indexOf('tables') != -1) {
                viewFactory.right = 'tables';
            }

            if (toState.name.indexOf('list') != -1) {
                viewFactory.left = 'list';
            } else if (toState.name.indexOf('filetree') != -1) {
                viewFactory.left = 'filetree';
            }
         }
     });
    //  $scope.$on('$stateChangeStart', 
    //  function(event, toState, toParams, fromState, fromParams) {
    //      //event.preventDefault(); 
    //  });

    //  $scope.$on('$viewContentLoaded', function(event, a, b, c, d) {
    //  });
    // $scope.$on('$stateChangeStart', 
    // function(event, toState, toParams, fromState, fromParams) {
        //event.preventDefault(); 
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