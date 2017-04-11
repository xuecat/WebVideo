'user strict';

angular.module('app')
.controller('videoController', ['$scope', '$state','$translate', 'appToggleData', '$stateParams',
    function ScopeController($scope, $state, $translate, appToggleData, $stateParams) {
        $scope.toggleView = appToggleData;
        $scope.postImage = $stateParams.param1;
        $scope.videoSrc = $stateParams.param2;
        $scope.videoType = $stateParams.type;
    }
]);
