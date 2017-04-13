'user strict';

angular.module('app')
.controller('videoController', ['$scope', '$state','$translate', 'appToggleData', '$stateParams',
    function ScopeController($scope, $state, $translate, appToggleData, $stateParams) {
        var myplayer = videojs('v-player');

        $scope.toggleView = appToggleData;
        $scope.videoTitle = $stateParams.param2.substring($stateParams.param2.lastIndexOf('/'));
        $scope.videoType = $stateParams.param2.substring($stateParams.param2.lastIndexOf('.'));

        var videoType = '';
        switch ($stateParams.type) {
            case '1': {
                videoType = 'video/mp4';
            } break;
            case '2': {
                videoType = 'video/webm';
            } break;
            case '3': {
                videoType = 'video/ogg';
            } break;
            case '4': {
                videoType = 'video/avi';
            } break;
            default:
                break;
        }

        myplayer.poster($stateParams.param1);
        myplayer.src({
            type: videoType,
            src: $stateParams.param2,
        });
    }
]);
