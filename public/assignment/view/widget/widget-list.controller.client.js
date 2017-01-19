(function(){
    angular
        .module("WebAppMaker")
         .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce,$routeParams, WidgetService) {

        var vm=this;
        vm.pageId= $routeParams.pid;
        vm.websiteId=$routeParams.wid;
        vm.userId=$routeParams.uid;

        console.log(vm.pageId);
        console.log(vm.websiteId);
        console.log(vm.userId);

        vm.getSafeHtml= getSafeHtml;
        vm.getSafeUrl= getSafeUrl;

        function init() {

            vm.widgets= WidgetService.findWidgetsForPageId(vm.pageId);
            $(".container")
                .sortable({
                    axis:'y'
                });

        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts= widget.url.split("/");
            var id=urlParts[urlParts.length-1];
            var url="https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }
    }

})();
