angular
    .module('STO')
    .factory('guruinfo', guruinfo);

guruinfo.$inject = ['$q'];

/* @ngInject */
function guruinfo($q) {

    var guruInfo = {};

    var service = {
        setUserAuto: setUserAuto,
        getUserAuto: getUserAuto,

        setUserDefectType: setUserDefectType,
        getUserDefectType: getUserDefectType
    };

    return service;

    ////////////////

    /**
     * ????????? ????????? ????????????? ??????
     */
    function setUserAuto(auto) {
        guruInfo.auto = auto;
    }

    /**
     * ?????????? ????????? ????????????? ??????
     */
    function getUserAuto() {
        return $q.when(guruInfo.auto);
    }

    function setUserDefectType(type) {
        guruInfo.defectType = type;
    }

    function getUserDefectType() {
       return $q.when(guruInfo.defectType);
    }

}
