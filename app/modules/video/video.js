'user strict';

angular.module('app')
.controller('videoController', ['$scope', '$state','$translate', 'appToggleData', '$stateParams',
    function ScopeController($scope, $state, $translate, appToggleData, $stateParams) {
        var myplayer = videojs('v-player');

        $scope.toggleView = appToggleData;
        $scope.videoTitle = $stateParams.param2.substring($stateParams.param2.lastIndexOf('/'));
        $scope.videoType = $stateParams.param2.substring($stateParams.param2.lastIndexOf('.'));

        var videoType = 'video/' + $stateParams.type;

        myplayer.poster($stateParams.param1);
        myplayer.src({
            type: videoType,
            src: $stateParams.param2,
        });
    }
]);
