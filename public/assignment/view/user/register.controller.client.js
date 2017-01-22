(function () {

    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm=this;

        vm.register=register;

        function register (username, password, password2) {
            console.log("Check2");
            UserService
                .register(username,password)
                .then (function(response) {

                    var user=response.data;
                    if (user) {
                        $location.url("/user/"+user._id);
                    }

            },
                function (err) {

                    vm.error=err;

                }
                );

        }

    }

})();