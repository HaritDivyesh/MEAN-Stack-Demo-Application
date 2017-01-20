
module.exports=function (app) {

    var mongoose=require("mongoose");
    var TodoSchema=mongoose.Schema({

        priority: Number,
        title: String,
        todo: String

    });

    var Todo=mongoose.model("Todo", TodoSchema);

        app.get("/api/todos", findAllTodos);
        app.put("/api/todos", reorderTodos);

    function reorderTodos(req, res) {

        var start=parseInt(req.query.start);
        var end=parseInt(req.query.end);
        console.log([start,end]);
        Todo.find(function (err, todos) {

            todos.forEach(function (todo) {

                if(start>end) {
                    if(todo.priority>=end && todo.priority < start){
                        todo.priority++;
                        todo.save(function(){});
                    }
                    else if(todo.priority===start) {
                        todo.priority=end;
                        todo.save(function(){});
                    }

                }
                else{
                    if(todo.priority===start){
                        todo.priority=end;
                        todo.save(function(){});
                    }

                    else if (todo.priority>start && todo.priority<=end){

                        todo.priority--;
                        todo.save(function(){});
                    }
                }

            });
            res.sendStatus(200);
        });
    }

        function findAllTodos(req, res) {

            Todo
                .find()
                .then(function (todos) {

                    res.json(todos);
                });

        }

        // Todo.create({"priority": 1, "title": "MEAN stack", "todo": "Design a working website"});
        // Todo.create({"priority": 2, "title": "CS589", "todo": "Study Linear ALgebra, Numpy, Scikit-learn"});
        // Todo.create({"priority": 3, "title": "Internship", "todo": "Apply for internship"});
        // Todo.create({"priority": 4, "title": "Internship1", "todo": "Apply for internship"});
        // Todo.create({"priority": 5, "title": "Internship2", "todo": "Apply for internship"});
        // Todo.create({"priority": 6, "title": "Internship3", "todo": "Apply for internship"});
        // Todo.create({"priority": 7, "title": "Internship4", "todo": "Apply for internship"});


}