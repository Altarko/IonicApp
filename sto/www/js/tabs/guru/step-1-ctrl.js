/**
 * Шаг 1 - выбор автомобиля пользователя
 */
angular
    .module('STO')
    .controller('Step1autoSelect', Step1autoSelect);

Step1autoSelect.$inject = ['userautos', 'Guru'];

/* @ngInject */
function Step1autoSelect(userautos, Guru) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.autos = [];                          // массив автомобилей пользователя
    vm.autoSelected = autoSelected;         // сохранение выбранного пользователем автомобиля
    vm.userAuto = {};


    activate();

    ////////////////

    function activate() {
        getAutos().then(function(){
            // устанавливаем выбранным элементом первый из доступных автомобилей
            vm.userAuto = vm.autos[0];
        })
    }

    /**
     * Запрос автомобилей пользователя
     */
    function getAutos() {
       return userautos.getAutos().then(function(response) {
            vm.autos = response;
            return vm.autos;
        })
    }

    /**
     * Сохранение выбранного пользователем автомобиля
     */
    function autoSelected() {
        var info = {
            auto: vm.userAuto
        };
        Guru.setGuruInfo(info);
        //guruinfo.setUserAuto(vm.userAuto);
    }


}