(function(){
    angular
        .module("WebAppMaker")
         .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {

        var vm=this;
        vm.userId=$routeParams.userId;
        function init() {

           WebsiteService.findWebsitesForUserId($routeParams.userId)
               .then(
                   function (response) {
                       vm.websites=response.data;
                       
                   },
                   function () {

                       vm.error = "Something went wrong..."
                   }
               );
        }
        init();
    }

})();
