(function () {

    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        console.log("Check1");
        var vm=this;

        vm.register=register;

        function register (username, password, password2) {
            console.log("Check2");
            UserService
                .createUser(username,password)
                .then (function(response) {

                    var user=response.data;
                    if (user) {
                        $location.url("/user/"+user._id);
                    }

            });

        }

    }

})();