angular
    .module('STO')
    .factory('setUserProblem', setUserProblem);

setUserProblem.$inject = ['$http', 'config'];

/* @ngInject */
function setUserProblem($http, config) {
    var service = {
        setUserProblemPost: setUserProblemPost
    };

    return service;

    ////////////////

    function setUserProblemPost(dataPost) {
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/set_user_problem',
            method: "POST",
            //withCredentials: true,
            data: dataPost,
            headers: {
                'Content-Type' :'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'/*,
                 'Set-Cookies': 'JSESSIONID=b80dce131dad765177f0e45110e1'*/
            }
        })
            .then(getMComplete)
            .catch(getMFailed);

        function getMComplete(response) {
            return (response.data);
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка передачи данных о проблеме');
        }
    }


}
