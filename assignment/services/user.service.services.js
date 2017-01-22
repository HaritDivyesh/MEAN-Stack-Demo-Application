
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, models) {

    var userModel=models.userModel;

    var users= [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/register",register);
    app.post("/api/user/:userId", createUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.get("/api/loggedIn",loggedIn);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user/:username/",findUserByUsername);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/logout", logout);
    app.delete("/api/user/:userId",deleteUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    
    function localStrategy(username, password, done) {

        userModel.findUserByCredentials(username, password)
            .then (
                function(user) {
                    if(user) {
                        done(null,user);
                    }
                    else{
                        done(null, false);
                    }

                }, function (err) {

                    done(err);

                }
            );

        
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    
    function login(req, res) {

        var user=req.user;
        res.json(user);

    }

    function loggedIn(req,res) {

        if(req.isAuthenticated()) {

            res.json(req.user);
        }
        else {
            res.send("0");
            }
    }
    
    function register(req, res) {

        var username=req.body.username;
        var password=req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        res.status(400).send("Username already exists");
                        return;
                    }
                    else {
                    return userModel.createUser(req.body);
                    }
                }, 
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function (user) {
                if(user) {
                    req.login(user, function (err) {

                        if(err) {
                            res.send(400).send(err);
                        }
                        else{
                            res.json(user);
                        }

                    });
                }
            },
                function (err) {
                    res.status(400).send(err);
                });
    }


    function logout(req,res) {

        req.logout();
        res.sendStatus(200);

    }

    function deleteUser(req,res) {

        var id=req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (stats) {

                    console.log(user);
                    res.send(200);

                }, function (error) {

                    res.statusCode(404).send(error);

                }
            );
        
        // for (var i in users) {
        //     if (users[i]._id === id) {
        //
        //         users.splice(i, 1);
        //         res.send(200);
        //         return;
        //
        //     }
        // }
        //
        // res.send (400);


    }

    function updateUser(req,res) {
        var id= req.params.userId;
        var newUser=req.body;
        userModel
            .updateUser(id, newUser)
            .then(
            function (stats) {

                console.log(user);
                res.send(200);

            }, function (error) {

                res.statusCode(404).send(error);

            }
            );

        // for (var i in users) {
        //     if (users[i]._id === id) {
        //         console.log(users[i].firstName);
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
       // res.send(400);
    }

    app.post("/api/user", createUser);

    function createUser(req, res) {

        var user=req.body;

        userModel
            .createUser(user)
            .then(
                function (user) {

                console.log(user);
                res.json(user);

        }, function (error) {

                res.statusCode(400).send(error);

                }
        );


    }


    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(username, password, req, res);

        }
        else if (username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }

    }


    function findUserByUsername(username, res) {

        for (var i in users) {
            if(users[i].username===username) {
                res.send(users[i]);
                return;
            }
        }

        res.send("Nope!");

    }

    function findUserById(req, res) {
        var id=req.params.userId;

        console.log(req.session.currentUser);

        userModel
            .findUserById(id)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.send(404).send(error);
                }
            );

    //     for (var i in users) {
    //         if(users[i]._id===id) {
    //             res.send(users[i]);
    //             return;
    //         }
    //     }
    //
    //     res.send("Nope!");
    }

};