angular.module('app')
.controller('mainController', ['$scope', '$state',
 function($scope, $state) {
     $scope.linkPage = $state.current.data.linkTitle;
     $scope.linkUrl = $state.current.data.linkUrl;

     $scope.toggle = false;

     $scope.ToggleSidebar = function() {
         $scope.toggle = !$scope.toggle;
     }
 }
]);