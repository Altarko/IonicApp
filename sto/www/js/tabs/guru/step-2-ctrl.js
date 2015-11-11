/**
 * Шаг 2 - ввод пробега автомобиля
 */

angular
    .module('STO')
    .controller('Step2millage', Step2millage);

Step2millage.$inject = ['currentUser', 'formEncode', 'Guru', '$scope'];

/* @ngInject */
function Step2millage(currentUser, formEncode, Guru, $scope) {
    /* jshint validthis: true */
    var vm = this,
        currentUserInfo = {};

    vm.activate = activate;

    vm.userAuto = {};                       // выбранный пользотелем автомобиль
    vm.setMillage = setMillage;             // сохранение пробега


    activate();

    ////////////////

    function activate() {
       getUserAuto();
        Guru.setGuruInfo({
            userGlobalDefectTypes: null,
            userDefect: null,
            context_id: null,
            context_scale_id: null,
            results: {}
        })

    }

    $scope.$on("$ionicView.enter", function() {
        activate()
    });

    /**
     * Сохраняет пробег пользователя
     */
    function setMillage() {
        // cохранили в гуру пробег введенный пользователем
        Guru.setMilage(vm.userAuto.distance);
        // очищает другие поля
        /*Guru.setGuruInfo({
            userGlobalDefectTypes: null,
            userDefect: null,
            context_id: null,
            context_scale_id: null,
            results: ''
        })*/
    }

    /**
     * Запрашиваем выбранный пользователем автомобиль
     * @returns {*}
     */
    function getUserAuto() {
        return Guru.getGuruInfo().then(function(response){
            vm.userAuto = response.auto;
            return vm.userAuto;
        })
    }

}