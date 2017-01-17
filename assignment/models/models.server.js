
module.exports= function() {

    var mongoose= require('mongoose');
    mongoose.connect('mongodb://localhost/SelfProject');


    var models= {

        userModel: require("./user/user.model.server.js")()

        //TODO: Add all other models: websiteModel, pageModel, widgetModel...

    };

    return  models;

};