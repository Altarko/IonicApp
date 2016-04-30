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
    var stoConvertedList = {};

    var service = {
        getStoList: getStoList,
        getStoConvertedList: getStoConvertedList
    };

    return service;


    function getStoList() {
        if (!sto_list.length) {
            var dataPost = formEncode.encode({
                session_id: currentUser.profile.session_id,
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
            console.log(response);
            sto_list = response.data.data;
            convertStoList();
            return sto_list;
        }

        function getDFailed(error) {
            return (error.data = 'Ошибка в getStoList');
        }
    }

    function getStoConvertedList() {
        return stoConvertedList;
    }


    function convertStoList() {
        for (var i = 0, l = sto_list.length; i < l; i += 1) {
            var a = sto_list[i].sto_id;
            stoConvertedList[a] = {
                name: sto_list[i].sto_name,
                state: 'ONLINE',
                address: sto_list[i].sto_addr,
                region_id: sto_list[i].region_id,
                sto_lat: sto_list[i].sto_lat,
                sto_lon: sto_list[i].sto_lon,
                sto_url: sto_list[i].sto_url,
                upToDate: null
            }
        }
    }

}
