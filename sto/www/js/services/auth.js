angular
    .module('STO')
    .factory('auth', auth);

auth.$inject = ['$http', 'formEncode', 'currentUser'];

/* @ngInject */
function auth($http, formEncode, currentUser) {

    var url = 'http://80.78.244.190:8080';

    var service = {
        login: login
    };

    return service;

    ////////////////

    function login(user) {
        var data = formEncode.encode({
            'login': user.username,
            'password': user.password
        });

        return $http({
            url: url + '/ctoweb/auth',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type' :'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(loginComplete)
            .catch(loginFailed);

        function loginComplete(response) {
            console.log(response);
            currentUser.setProfile(user.username, response.data);
            return response;
        }

        function loginFailed(error) {
            return (error.data = '?????? ??????');
        }

    }


}
