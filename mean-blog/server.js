var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meanblog');

app.get("/api/post", findAllPosts);
app.post("/api/post", createPost);
app.delete("/api/post/:id", removePost)

var posts=[];

var ps=mongoose.Schema( {
   title:String,
    body: String
});

var pm=mongoose.model("PostModel",ps);

function removePost(req,res) {
    var id= req.params.id;
    pm
        .remove({_id: id})
        .then(function(stat) {

            findAllPosts(req,res);
        });
}

function createPost(req,res){

    var post=req.body;
    pm
        .create(post)
        .then(function(doc) {
            posts.push(doc);
            res.json(posts);

        });
}

function findAllPosts(req, res) {

   // console.log(req);
    pm
        .find()
        .then(function(docs) {
            posts=docs;
            res.json(posts);
        });
}


app.listen(3000);