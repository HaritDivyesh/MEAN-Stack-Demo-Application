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
            findUserById: findUserById,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(username, password) {
            var user= {

                username:username,
                password:password

            };

            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {
            for (var i in users) {
                if (users[i]._id === id) {
                    users.splice(i);
                    return true;
                }
            }
            return false;
        }

        function updateUser(id, newUser) {
            console.log(newUser);
            for (var i in users) {
                if (users[i]._id === id) {
                    console.log(users[i].firstName);
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
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