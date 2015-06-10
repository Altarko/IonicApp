angular
    .module('STO')
    .factory('autoservices', autoservices);

autoservices.$inject = ['$http', '$q', 'addData'];

/* @ngInject */
function autoservices($http, $q, addData) {

    var url = 'http://80.78.244.190:8080';
    var stos = [];                                          // массив автосервисов

    var service = {
        getAutoServices: getAutoServices,                   // получаем список автосервисов
        getAutoServicesCORS: getAutoServicesCORS            //
    };



    return service;

    ////////////////

    function getAutoServices() {
        if (stos.length !== 0) {
            return $q.when(stos);
        } else {
            return $http.get('http://alexeytarasenko.ru/projects/stoapi/sto.php')
                .then(getStoComplete)
                .catch(getStoFailed);

            function getStoComplete(response) {
                stos = response.data;
                return (response.data);
            }

            function getStoFailed(error) {
                return (error.data = 'Ошибка получения списка Автосервисов');
            }
        }
    }

    function getAutoServicesCORS() {
        //var dataPost = {'session_id': 1, 'account_id': 34};
        //var dataPost = 'session_id=1&account_id=34';
        //data.cookies = 'Cookie:JSESSIONID=43e7cf24ef8ea792de136a83afda';
        //$cookies.put('JSESSIONID', '43e7cf24ef8ea792de136a83afda');
        var dataPost = addData.addData();
        console.log(dataPost);
        return $http({
            url: url + '/ctoweb/rest/get_entities/get_ts',
            method: "POST",
            //withCredentials: true,
            data: dataPost,
            headers: {
                'Content-Type' :'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'/*,
                'Set-Cookies': 'JSESSIONID=b80dce131dad765177f0e45110e1'*/
            }
        })
            .then(getStoCORSComplete)
            .catch(getStoCORSFailed);

        function getStoCORSComplete(response) {
            console.log(response.data.data);
            return response.data.data;
        }

        function getStoCORSFailed(error) {
            return (error.data = 'Ошибка получения списка автосервисов');
        }
    }


}
