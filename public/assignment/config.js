(function(){

    angular
        .module("WebAppMaker")
        .config(config);

    function config($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "view/home.html"
        })
        .when("/login", {
            templateUrl: "view/user/login.view.client.html",
            controller: "LoginController",
            controllerAs: "model"
        })
        .when("/register", {
            templateUrl: "view/user/register.view.client.html"
        })
        .when("/profile/:id", {
            templateUrl: "view/user/profile.view.client.html",
            controller: "ProfileController",
            controllerAs: "model"
        })
        .otherwise({
            redirectTo: "/login"
        });
    }

})();