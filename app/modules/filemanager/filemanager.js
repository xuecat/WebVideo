'user strict';

angular.module('app')
    .controller('filemanagerController', ['$scope', '$state', '$translate', 'appToggleData',
        function ScopeController($scope, $state, $translate, appToggleData) {
            $scope.toggleView = appToggleData;

            $scope.smartClick = function(item) {
                var name = $scope.fileNavigator.rootStaticUrl + item.name;
                name.replace("//", "/");

                $state.go('home.video', {
                    type: item.name.split('.').pop(),
                    param1: item.img,
                    param2: name
                });
            };
        }
    ]);