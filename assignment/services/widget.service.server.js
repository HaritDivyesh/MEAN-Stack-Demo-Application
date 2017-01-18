
var widgets=
    [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    //TODO: post, getx2, put, delete

    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    app.get("/api/widget/:widgetId",findWidgetById);

    function findWidgetById(req, res) {

        var widgetId=req.params.widgetId;

        for (var w in widgets) {

            if(widgets[w]._id===widgetId) {

                res.json(widgets[w]);
                return;
            }
        }


        res.status(404).send("Unable to find widget with id:"+widgetId);

    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname;
        var filename      = myFile.filename;
        var path          = myFile.path;
        var destination   = myFile.destination;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        for (var w in widgets) {

            if(widgets[w]._id===widgetId) {

                widgets[w].url="/uploads/"+ filename;

            }
        }

        res.redirect("/assignment/#/user/:uid/website/:wid/page/:pid/widget/"+widgetId);
    }

}