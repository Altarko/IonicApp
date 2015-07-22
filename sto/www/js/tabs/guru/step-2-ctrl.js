/**
 * Шаг 2 - ввод пробега автомобиля
 */

angular
    .module('STO')
    .controller('Step2millage', Step2millage);

Step2millage.$inject = ['guruinfo', 'currentUser', 'formEncode', 'setMilage'];

/* @ngInject */
function Step2millage(guruinfo, currentUser, formEncode, setMilage) {
    /* jshint validthis: true */
    var vm = this,
        currentUserInfo = {};

    vm.activate = activate;

    vm.userAuto = {};                       // выбранный пользотелем автомобиль
    vm.setMillage = setMillage;             // сохранение пробега


    activate();

    ////////////////

    function activate() {
        getUserProfile()
            .then(getUserAuto())
    }

    /**
     * Сохраняет пробег пользователя
     */
    function setMillage() {
        var obj = formEncode.encode({
            session_id: currentUserInfo.session_key,
            account_id: currentUserInfo.account_id,
            milage: vm.userAuto.distance,
            curTsId: vm.userAuto.id,
            curTsIndex: 0
        });
        setMilage.setMilagePost(obj).then(function(response){
            console.log(response);
        })
    }

    /**
     * Запрашиваем выбранный пользователем автомобиль
     * @returns {*}
     */
    function getUserAuto() {
        return guruinfo.getUserAuto().then(function(response){
            vm.userAuto = response;
            return vm.userAuto;
        })
    }

    /**
     * Запрашивает профиль пользователя
     * @returns {*}
     */
    function getUserProfile() {
        return currentUser.getProfile().then(function(response) {
            currentUserInfo = response;
            return currentUserInfo;
        })
    }

}