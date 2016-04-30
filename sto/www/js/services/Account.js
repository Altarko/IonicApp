/**
 * Сервис для работы с диалогом гуру
 */

angular
    .module('STO')
    .factory('Account', Account);

/* @ngInject */
function Account($http, $q, addData, config, formEncode) {

    var service = {
        getAccountInfo: getAccountInfo
    };

    return service;

    function getAccountInfo() {
        var dataPost = addData.addData();
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_account_info',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getDComplete)
            .catch(getDFailed);

        function getDComplete(response) {
            return response.data.data;
        }

        function getDFailed(error) {
            return (error.data = 'Ошибка получения информации по пользователю');
        }
    }

}
