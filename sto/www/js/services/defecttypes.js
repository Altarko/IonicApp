/**
 * ?????? ????? ??????????????
 */
angular
    .module('STO')
    .factory('DefectTypes', DefectTypes);

DefectTypes.$inject = ['$http', 'addData', 'config'];

/* @ngInject */
function DefectTypes($http, addData, config) {

    var defectTypes;

    var service = {
        getTypes: getTypes
    };

    return service;

    ////////////////

    function getTypes() {
        var dataPost = addData.addData();
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_defect_types',
            method: "POST",
            //withCredentials: true,
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
            console.log(response.data.data2);
            defectTypes = response.data.data2;
            return (response.data.data2);
        }

        function getAFailed(error) {
            return (error.data = '?????? ????????? ?????? ????? ??????????????');
        }
    }


}
