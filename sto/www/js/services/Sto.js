/**
 * Сервис для работы с СТО
 */

angular
    .module('STO')
    .factory('Sto', Sto);

Sto.$inject = ['$http', '$q', 'addData', 'config', 'formEncode', 'currentUser'];

/* @ngInject */
function Sto($http, $q, addData, config, formEncode, currentUser) {

    var sto_list = [];

    var service = {
        getStoList: getStoList
    };

    return service;


    function getStoList() {
        if (!sto_list.length) {
            var dataPost = formEncode.encode({
                session_id: currentUser.profile.session_key,
                region_id: 9
            });
            return $http({
                url: config.url + '/ctoweb/rest/get_entities/get_cto',
                method: "POST",
                data: dataPost,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': '*/*'
                }
            })
                .then(getDComplete)
                .catch(getDFailed);
        } else {
            return $q.when(sto_list);
        }

        function getDComplete(response) {
            sto_list = response.data.data;
            return sto_list;
        }

        function getDFailed(error) {
            return (error.data = 'Ошибка в getStoList');
        }
    }

}
