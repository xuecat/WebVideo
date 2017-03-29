angular.module('app')
.controller('errorController', ['$scope', '$state', '$location',
    function($scope, $location, $state) {
        $scope.goback = function() {
            window.history.go(-1);
        }

        $scope.goToIndexPage = function() {
            $state.go('home');
        } 
    }
])
