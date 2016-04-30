angular
    .module('STO')
    .factory('auth', auth);

auth.$inject = ['$http', 'formEncode', 'currentUser', 'Guru'];

/* @ngInject */
function auth($http, formEncode, currentUser, Guru) {

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
            console.log(response.data);
            Guru.setGuruInfo({
                session_id: response.data.session_id,
                account_id: response.data.account_id
            });
            return response;
        }

        function loginFailed(error) {
            return (error.data = '?????? ??????');
        }

    }


}
