/**
 * Шаг 3 - запрашиваем типы неисправностей
 */
angular
    .module('STO')
    .controller('Step3Defecttypes', Step3Defecttypes);

Step3Defecttypes.$inject = ['DefectTypes', 'guruinfo'];

/* @ngInject */
function Step3Defecttypes(DefectTypes, guruinfo) {
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
            vm.userDefectType= vm.defectTypes[0];
        });
    }

    /**
     * Запрашивает типы неисправностей
     */
    function getDefectTypes() {
        return DefectTypes.getTypes().then(function(response) {
            vm.defectTypes = response;
            return vm.defectTypes;
        })
    }

    /**
     * Сохранает тип неисправности выбранный пользователем
     * @constructor
     */
    function DefectTypeSelected() {
        guruinfo.setUserDefectType(vm.userDefectType);
    }

}