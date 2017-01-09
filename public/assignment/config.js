(function(){

    angular
        .module("WebAppMaker")
        .config(config);

    function config($routeProvider) {

    $routeProvider
        .when("/login", {
            templateUrl: "view/user/login.view.client.html"
        })
        .when("/register", {
            templateUrl: "view/user/register.view.client.html"
        })
        .when("/profile", {
            templateUrl: "view/user/profile.view.client.html"
        })
    }

})();