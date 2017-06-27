'user strict';
angular.module('app')
    .config(['$translateProvider', '$httpProvider', function($translateProvider, $httpProvider) {

        $httpProvider.defaults.headers.common = { 'WebVideo-Header': 'Client' }
        $translateProvider.useSanitizeValueStrategy('escapeParameters'); //设置安全参数，防止代码插入
        $translateProvider.useStaticFilesLoader({
            files: [{
                prefix: './translate/local-',
                suffix: '.json'
            }, ]
        });
        $translateProvider.preferredLanguage('en');
    }])
    .factory('webServer', ['$http', function($http) {
        return {
            GetRootWeb: function(fun) {
                if (fun) {
                    return $http.get('api/video/GetWebRoot').then(fun);
                } else {
                    return $http.get('api/video/GetWebRoot');
                }
            },
            GetItemVideo: function(pname, fun) {
                if (fun) {
                    return $http.get('api/video/GetRootVideo/?pname=' + pname).then(fun);
                } else {
                    return $http.get('api/video/GetRootVideo/?pname=' + pname);
                }
            }
        };
    }])
    .service('fileNavigator', ['webServer', '$state', function(webServer, $state) {
        var FileNavigator = function() {
            this.currentItem = {};
            this.filelist = [];
            this.rootStaticUrl = "";
        }

        function item(name, size, date, type, node) {
            if (!(this instanceof item))
                return new item(name, size, date, type);

            this.name = name;
            this.size = size;
            this.date = date;
            this.type = type; //0folder 1file
            this.img = '';
            if (node) {
                if (this.hasOwnProperty("node")) {
                    this.node = this.node.concat(node);
                } else {
                    this.node = [];
                    this.node = this.node.concat(node);
                }
            }
        }

        function createNode(itm, node) {
            if (node) {
                if (itm.hasOwnProperty("node")) {
                    itm.node.splice(0, itm.node.length);
                    itm.node = itm.node.concat(node);
                } else {
                    itm.node = [];
                    itm.node = itm.node.concat(node);
                }
            }
        }

        FileNavigator.prototype.createFileTree = function() {
            var self = this;
            webServer.GetRootWeb(function(result) {
                if (result.status == 200) {
                    self.rootStaticUrl = result.data;

                    var rootitem = new item(result.data, 0, 0, 0);
                    self.filelist.push(rootitem);

                    webServer.GetItemVideo("0", function(result) {
                        if (result.status == 200) {
                            createNode(rootitem, result.data);
                            self.currentItem = rootitem;
                        }
                    });
                }
            });

            //test data
            // self.rootStaticUrl = "/data";
            // self.filelist.push(item("data", 1, 1, 0));
            // createNode(self.filelist[0], [item("tt.txt", 1, 1, 1),
            //     item("dd", 1, 1, 0)
            // ]);
            // self.currentItem = self.filelist[0];
        }

        FileNavigator.prototype.refresh = function(itm) {
            if (itm) {
                if (itm.type == 0) {
                    webServer.GetItemVideo(itm.name, function(result) {
                        if (result.status == 200) {
                            createNode(itm, result.data);
                        }
                    });

                    //test data
                    //createNode(itm, [item(itm.name + "//" + "zz", 1, 1, 0), item("pp.txt", 1, 1, 1)]);
                }
            }
        }

        FileNavigator.prototype.isFolder = function(itm) {
            if (itm) {
                if (itm.type == 0) {
                    return true;
                }
            }
            return false;
        }

        FileNavigator.prototype.folderClick = function(itm) {
            if (itm) {
                if ($state.current.name != 'home.filemanager') {
                    $state.transitionTo('home.filemanager');
                }

                this.currentItem = itm;
                this.refresh(itm);
            }
        }

        return FileNavigator;
    }])
    .filter('strLimit', ['$filter', function($filter) {
        return function(input, limit, more) {
            if (input.length <= limit) {
                return input;
            }
            return $filter('limitTo')(input, limit) + (more || '...');
        };
    }])
    .filter('fileExtension', ['$filter', function($filter) {
        return function(input) {
            return /\./.test(input) && $filter('strLimit')(input.split('.').pop(), 3, '..') || '';
        };
    }])
    .constant('appAllConst', { 'LEFT_VIEW': 0, 'RIGHT_VIEW': 1, })
    .value('appToggleData', {
        toggleTablesView: 'anim-fade',
        toggleDashboardView: 'anim-fade',
        toggleVideoView: 'anim-fade'
    });