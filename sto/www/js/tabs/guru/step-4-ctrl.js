/**
 * Шаг 4 - выбор неисправности в зависимости от типа
 */
angular
    .module('STO')
    .controller('Step4Defects', Step4Defects);

Step4Defects.$inject = ['guruinfo', 'currentUser', 'formEncode', 'Defects', '$q'];

/* @ngInject */
function Step4Defects(guruinfo, currentUser, formEncode, Defects, $q) {
    /* jshint validthis: true */
    var vm = this,
        defecttype = {},
        currentUserInfo = {};

    vm.activate = activate;

    vm.defects = [];                                // массив неисправностей
    vm.userDefect = {};                             // выбранная пользователем неиспавность

    activate();

    ////////////////

    function activate() {

        // синхронизируем асинхронные запросы
        var promises = [getUserInfo(), getDefectType()];

        return $q.all(promises).then(function() {
            getDefects().then(function(){
                // устанавливает селект по умолчанию
                vm.userDefect = vm.defects[0];
            });
        });
    }

    /**
     * Запрашивает данные пользователя
     */
    function getUserInfo() {
        return currentUser.getProfile().then(function (response) {
            currentUserInfo = response;
            console.log(response);
            return currentUserInfo;
        })
    }

    /**
     *  Запрашивает тип несправности, выбранные пользователем на прошлом шаге
     */
    function getDefectType() {
        return guruinfo.getUserDefectType().then(function (response) {
            console.log(response);
            defecttype = response;
            return response;
        })
    }

    /**
     * Запрашиват неиправности в записимости от выбранного типа
     */
    function getDefects() {
        var obj = formEncode.encode({
            session_id: currentUserInfo.session_key,
            account_id: currentUserInfo.account_id,
            defect_type_id: defecttype.id
        });
        console.log(obj);
        return Defects.getDefects(obj).then(function (response) {
            console.log(response);
            vm.defects = response;
            return vm.defects;
        })
    }
}