
var express=require('express');
var app=express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form

app.use(express.static(__dirname + '/Revise'));
app.get("/api/post", sendAllPosts);
app.post("/api/post", createPost);
app.delete("/api/post/:index",remove);

var posts= [
    {title: "post 1", body:"body 1"},
    {title: "post 2", body:"body 2"},
    {title: "post 3", body:"body 3"}
];

function sendAllPosts(request,response) {
   // console.log(request);
    response.json(posts);
}

function createPost(request, response) {
    var post=request.body;
    posts.push(post);
    response.json(posts);

}

function remove(request,response) {
    var post=request.params.index;
    posts.splice(post,1);
    response.json(posts);
}

app.listen(3000);


