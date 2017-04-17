'user strict';
angular.module('app')
.config(['$translateProvider', function($translateProvider) {
    
    $translateProvider.useSanitizeValueStrategy('escapeParameters');//设置安全参数，防止代码插入
    $translateProvider.useStaticFilesLoader({
        files: [{
            prefix: './translate/local-',
            suffix: '.json'
        },]
    });
    $translateProvider.preferredLanguage('en');
}])
.service('fileNavigator', function() {
    var FileNavigator = function() {
        this.currentPath = '';
        this.filelist = [];
    }

    function item (name, size, date, type, node) {
        if (! (this instanceof item))
            return new item(name, size, date, type);

        this.name = name;
        this.size = size;
        this.date = date;
        this.type = type;//0folder 1file
        if (node) {
            if (this.hasOwnProperty("node")) {
                this.node.push(node);
            } else {
                this.node = [];
                this.node.push(node);
            }
        }
    }
    item.prototype.createNode = function(node) {
        if (node) {
            if (this.hasOwnProperty("node")) {
                this.node.push(node);
            } else {
                this.node = [];
                this.node.push(node);
            }
        }
    }

    FileNavigator.prototype.createFileTree = function() {
        this.filelist = [
            item('/path/data', 32, '2012/02/01', 0),
        ];
    }

// [
//                 item('/path/data/tt.txt', 12, '2011/11/11', 1),
//                 item('/path/data/hehe', 20, '2012/13/01', 0, [
//                     item('/path/data/hehe/ht.txt', 12, '2011/01/01', 1),
//                     item('/path/data/hehe/rt.txt', 12, '2011/01/01', 1),
//                 ]),
//             ]

    FileNavigator.prototype.refresh = function(itm) {
        if (itm) {
            if (itm.type == 0) {
                if (itm.size == 32) {
                    itm.createNode(item('/path/data/tt.txt', 12, '2011/11/11', 1));
                    itm.createNode(item('/path/data/hehe', 20, '2012/13/01', 0));
                } else if (itm.size == 20) {
                    itm.createNode(item('/path/data/hehe/ht.txt', 12, '2011/01/01', 1));
                    itm.createNode(item('/path/data/hehe/rt.txt', 12, '2011/01/01', 1));
                }
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
            this.currentPath = itm.name;

            this.refresh(itm); 
        }
    }

    return FileNavigator;
})
.constant('appAllConst', {'LEFT_VIEW': 0, 'RIGHT_VIEW': 1,})
.value('appToggleData', {
    toggleTablesView: 'anim-fade',
    toggleDashboardView: 'anim-fade', 
    toggleVideoView: 'anim-fade'
});