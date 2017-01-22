/**
 * Created by abhaydoke on 09/01/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService($http) {
        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            login: login,
            loggedIn: loggedIn,
            findUserById: findUserById,
            createUser: createUser,
            register: register,
            updateUser: updateUser,
            deleteUser: deleteUser,
            logout:logout
        };
        return api;

        function logout() {

            return $http.post("/api/logout");

        }
        
        function loggedIn() {

            return $http.get("/api/loggedIn");

        }
        
        function login(username, password) {

            var user= {

                username:username,
                password:password

            };

            return $http.post("/api/login", user);

        }
        
        function register(username, password) {

            var user= {

                username:username,
                password:password

            };

            return $http.post("/api/register", user);


        }

        function createUser(username, password) {
            var user= {

                username:username,
                password:password

            };

            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {

            var url="/api/user/"+userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {

            var url="/api/user/"+id;
            return $http.put(url, newUser);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(id) {

            var url="/api/user/"+ id;
            return $http.get(url);

        }
    }
})();