/**
 * Шаг 3 - запрашиваем типы неисправностей
 */
angular
    .module('STO')
    .controller('Step3Defecttypes', Step3Defecttypes);

Step3Defecttypes.$inject = ['Guru', '$scope'];

/* @ngInject */
function Step3Defecttypes(Guru, $scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;

    vm.defectTypes = [];                            // массив типов неисправностей
    vm.DefectTypeSelected = DefectTypeSelected;     // сохранение типа неисправности, выбранной пользователем
    vm.userDefectType = {};                         // выбранный пользователем тип неисправности

    activate();

    ////////////////

    function activate() {
        getDefectTypes().then(function(){
            // по умолчанию устанавливаем в селекте первый тип неисправности
            vm.userDefectType = vm.defectTypes[0];
        });
        Guru.setGuruInfo({
            userDefect: null,
            context_id: null,
            context_scale_id: null,
            results: {}
        })
    }

    /**
     * Запрашивает типы неисправностей
     */
    function getDefectTypes() {
        return Guru.getGlobalDefectTypes().then(function(response) {
            vm.defectTypes = response;
            return vm.defectTypes;
        })
    }

    /**
     * Сохранает тип неисправности выбранный пользователем
     * @constructor
     */
    function DefectTypeSelected() {
        Guru.setGuruInfo({
            userGlobalDefectTypes: vm.userDefectType.id
        });
        /*Guru.setGuruInfo({
            //userDefect: null,
            context_id: null,
            context_scale_id: null,
            results: {}
        })*/
    }

}