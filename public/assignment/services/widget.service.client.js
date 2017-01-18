(function() {

    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets= [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>The official release doesn’t announce who the actor is playing, but since the initial report was right about him being cast, it seems likely he’ll indeed be some kind of mentor to Han, played by Alden Ehrenreich. Donald Glover is also in the film as Lando Calrissian, and <em>Game of Thrones</em>’ Emilia Clarke will play an as-yet-unnamed leading role.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function WidgetService($http) {

        var api= {

            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetById: findWidgetById

        };

        return api;

        function findWidgetById(widgetId) {

            var url= "/api/widget/"+widgetId;
            return $http.get(url);

        }
        
        function findWidgetsForPageId(pageId) {

            return widgets;

        }

    }

})();