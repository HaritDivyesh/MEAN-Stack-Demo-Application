(function(){
    angular
        .module("WebAppMaker")
         .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService) {

        var vm=this;
        var widgetId= $routeParams.widgetId;

        function init() {

            WidgetService
                .findWidgetById(widgetId)
                .then(
                    function (res) {

                        vm.widget=res.data;
                });
        }
        init();



    }

})();
