/**
 * Сервис запрашивает автомобили пользователя
 */
angular
    .module('STO')
    .factory('userautos', userautos);

userautos.$inject = ['$http', '$q', 'addData', 'config'];

/* @ngInject */
function userautos($http, $q, addData, config) {

    var autos = [];                              // массив автосервисов

    var service = {
        getAutos: getAutos,                     // запрос массива автомобилей пользователя
        getAutoId: getAutoId                    // запрос автомобиля по его id
    };



    return service;

    ////////////////

    /**
     * Запрашиваем автомобили пользователя
     * @returns {*}
     */
    function getAutos() {
        // если уже запрашивали, то выводим что есть
        if (autos.length > 0) {
            return $q.when(autos);
        // или запрашиваем
        } else {
            var dataPost = addData.addData();
            return $http({
                url: config.url + '/ctoweb/rest/get_entities/get_ts',
                method: "POST",
                withCredentials: true,
                data: dataPost,
                headers: {
                    'Content-Type' :'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': '*/*'/*,
                     'Set-Cookies': 'JSESSIONID=b80dce131dad765177f0e45110e1'*/
                }
            })
                .then(getAComplete)
                .catch(getAFailed);

            function getAComplete(response) {
                autos = response.data.data;
                return (response.data.data);
            }

            function getAFailed(error) {
                return (error.data = 'Ошибка получения списка автомобилей пользователя');
            }
        }
    }

    function getAutoId(carId) {
        var data = {};
        if (autos.length !== 0) {
            data = _.find(autos, {'id': carId});
            return $q.when(data);
        } else {
            return getAutos().then(function (response) {
                data = _.find(response, {'id': carId});
                return $q.when(data);
            })
        }
    }

}
