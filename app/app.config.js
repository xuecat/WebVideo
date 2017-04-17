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
        this.filelist = [];
    }

    function item (pathname, size, date, type, node) {
        if (! (this instanceof item))
            return new item(name, size, date, type);

        this.name = name;
        this.size = size;
        this.date = date;
        this.type = type;//0folder 1file
        if (node) {
            this.node.push(node);
        } else {
            this.node = [];
        }
    }

    FileNavigator.prototype.createFileTree = function() {
        this.filelist = [
            item('/path/data', 32, '2012/02/01', 0, [
                item('/path/data/tt.txt', 12, '2011/11/11', 1),
                item('/path/data/hehe', 20, '2012/13/01', 0, [
                    item('/path/data/hehe/ht.txt', 12, '2011/01/01', 1),
                    item('/path/data/hehe/rt.txt', 12, '2011/01/01', 1),
                ]),
            ]),
        ];
    }

    return FileNavigator;
})
.constant('appAllConst', {'LEFT_VIEW': 0, 'RIGHT_VIEW': 1,})
.value('appToggleData', {
    toggleTablesView: 'anim-fade',
    toggleDashboardView: 'anim-fade', 
    toggleVideoView: 'anim-fade'
});