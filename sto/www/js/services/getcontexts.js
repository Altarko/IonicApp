angular
    .module('STO')
    .factory('getContexts', getContexts);

getContexts.$inject = ['$http', 'config'];

/* @ngInject */
function getContexts($http, config) {
    var service = {
        getContextsPost: getContextsPost
    };

    return service;

    ////////////////

    function getContextsPost(dataPost) {
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_contexts',
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
            //console.log(response.data);
            //autos = response.data.data;
            return (response.data.data);
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка передачи контекста');
        }
    }


}
