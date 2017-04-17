'user strict';

angular.module('app')
.controller('mainController', ['$scope', '$state','$translate', 'appToggleData', 'appAllConst', 'fileNavigator',
 function($scope, $state, $translate, appToggleData,appAllConst, FileNavigator) {
     $scope.linkPage = $state.current.data;
     
     $scope.fileNavigator = new FileNavigator;
     $scope.fileNavigator.createFileTree();

     $state.transitionTo('home.dashboard');
    
     $scope.$on('$stateChangeSuccess', 
     function(event, toState, toParams, fromState, fromParams) {
         if (toState) {
            $scope.linkPage = toState.data;
         }
     });

     this.selectTemp = null;

     $scope.isInThisPath = function(path) {
        return path == $scope.fileNavigator.currentItem.name;
     };
     
     $scope.isSelected = function(itm) {
         if (itm) {
             return selectTemp == itm;
         }
         return false;
     }

     $scope.selectOrUnselect = function(itm) {
         if (itm) {
             selectTemp = itm;
         } else {
             selectTemp = null;
         }
     }

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