
(function () {

    angular
        .module("TodoApp", ["MyDirectives"])
        .controller("TodosController", TodosController);
    
    function TodosController($http) {

        var vm= this;
        vm.reorderTodos=reorderTodos;

        function init() {
            $http.get("/api/todos")
                .then(function (response) {

                    vm.data=response.data;

                });
        }

       init();
        
        function reorderTodos(start, end) {

            console.log("Todos Controller");
            console.log(start);
            console.log(end);
            $http.put("/api/todos?start="+start+"&end="+end)
                .then(init);
            
        }
    }


})();