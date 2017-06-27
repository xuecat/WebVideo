'user strict';

angular.module('app')
    .controller('filemanagerController', ['$scope', '$state', '$translate', 'appToggleData', '$swipe',
        function ScopeController($scope, $state, $translate, appToggleData, $swipe) {
            $scope.toggleView = appToggleData;

            $scope.smartClick = function(item, $event) {
                if ($event)
                    $event.stopPropagation();

                var name = $scope.fileNavigator.rootStaticUrl + item.name;
                name.replace("//", "/");

                $state.go('home.video', {
                    type: item.name.split('.').pop(),
                    param1: item.img,
                    param2: name
                });
            };

            $swipe.bind(angular.element(".clearfix"), {
                start: function(coords) {}
            });
        }
    ]);