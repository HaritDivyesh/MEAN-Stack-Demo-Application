/**
 * Created by abhaydoke on 10/01/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);


    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function WebsiteService(){

        var api = {
            findWebsitesForUserId : findWebsitesForUserId,
            findWebsiteById : findWebsiteById,
            createWebsite : createWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;

        function deleteWebsite(websiteId) {

            for (var i in websites) {
                if (websites[i]._id=== websiteId) {
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function findWebsitesForUserId(userId){
            var resultSet = []

            for(var i in websites){
                if(websites[i].developerId == userId) {
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }

        function findWebsiteById(id){

            for(var i in websites){
                if(websites[i]._id===id){
                    return websites[i];
                }
            }
            return null;
        }

        function createWebsite(developerID,name,description){
            var newWebsite ={
                _id:(new Date()).getTime()+"",
                name:name,
                description:description,
                developerId:developerID
            };
            websites.push(newWebsite);
            return newWebsite;

        }


    }
})();