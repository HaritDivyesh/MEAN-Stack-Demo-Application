
module.exports = function () {

    var mongoose=require('mongoose');

    var UserSchema = require("./user.schema.server")();
    var User= mongoose.model("User", UserSchema);

    var api= {

        createUser: createUser,
        findUserById: findUserById
    };

    return api;

    function findUserById(userId) {
        return User.findById(userId);
    }

    function createUser(user) {

        console.log("createUser DB test");
        console.log(user);

        return User.create(user);



    }

};
