'user strict';

angular.module('app')
.controller('videoController', ['$scope', '$state','$translate', 'appToggleData',
    function ScopeController($scope, $state, $translate, appToggleData) {
        $scope.toggleView = appToggleData;
        $scope.postImage = '';
        $scope.videoSrc = '';
        $scope.videoType = '';
    }
]);
