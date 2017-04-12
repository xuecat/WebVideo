'user strict';

angular.module('app')
.controller('videoController', ['$scope', '$state','$translate', 'appToggleData', '$stateParams',
    function ScopeController($scope, $state, $translate, appToggleData, $stateParams) {
        $scope.toggleView = appToggleData;
        $scope.postImage = $stateParams.param1;
        $scope.videoSrc = $stateParams.param2;

        switch ($stateParams.type) {
            case 1: {
                $scope.videoType = 'video/mp4';
            } break;
            case 2: {
                $scope.videoType = 'video/webm';
            } break;
            case 3: {
                $scope.videoType = 'video/ogg';
            } break;
            default:
                break;
        }
    }
]);
