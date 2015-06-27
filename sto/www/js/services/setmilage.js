angular
    .module('STO')
    .factory('setMilage', setMilage);

setMilage.$inject = ['$http', 'config'];

/* @ngInject */
function setMilage($http, config) {
    var service = {
        setMilagePost: setMilagePost
    };

    return service;

    ////////////////

    function setMilagePost(dataPost) {
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/set_milage',
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
            console.log(response.data);
            //autos = response.data.data;
            return (response.data);
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка передачи пробега');
        }
    }


}
