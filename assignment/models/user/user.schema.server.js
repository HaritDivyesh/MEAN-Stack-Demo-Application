
module.exports= function () {

    var mongoose= require("mongoose");

    var UserSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,
        dateCreated: {type: Date, default: Date.now }

    }, {collection:"assignment.user"});

    return UserSchema;

};