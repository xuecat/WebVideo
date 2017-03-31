'user strict';

angular.module('app')
.controller('mainController', ['$scope', '$state','$translate',
 function($scope, $state, $translate) {
     $scope.linkPage = $translate.instant($state.current.data.linkTitle);
     $scope.linkUrl = $state.current.data.linkUrl;

     $scope.toggle = true;

     $scope.ToggleSidebar = function() {
         $scope.toggle = !$scope.toggle;
     }
 }
]);