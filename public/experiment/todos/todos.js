
(function () {

    angular.module("MyDirectives", [])
        .directive("todos", todos);

    function todos() {
        console.log("inside todos");
        return {
            template: "These are my todos"
        }

    }

})();