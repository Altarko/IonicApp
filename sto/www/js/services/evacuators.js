angular
    .module('STO')
    .factory('evacuators', evacuators);

evacuators.$inject = ['$http', '$q'];

/* @ngInject */
function evacuators($http, $q) {

    var evacuators = [];                              // массив автосервисов

    var service = {
        getEvacuators: getEvacuators
    };



    return service;

    ////////////////

    function getEvacuators() {
        if (evacuators.length !== 0) {
            return $q.when(evacuators);
        } else {
            return $http.get('http://alexeytarasenko.ru/projects/stoapi/evacuators.php')
                .then(getEvaComplete)
                .catch(getEvaFailed);

            function getEvaComplete(response) {
                evacuators = response.data;
                return (response.data);
            }

            function getEvaFailed(error) {
                return (error.data = 'Ошибка получения списка эвакуаторов');
            }
        }
    }

}
