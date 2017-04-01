angular.module('app')
.controller('errorController', ['$scope', '$state', '$location',
    function($scope, $state, $location) {
        $scope.goback = function() {
            window.history.go(-1);
        }

        $scope.goToIndexPage = function() {
            $state.go('home');
        } 
    }
])
