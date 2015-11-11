angular
    .module('STO')
    .controller('ChatCtrl', ChatCtrl);


/* @ngInject */
function ChatCtrl($scope, Guru, Chat, Sto, userautos) {
    /* jshint validthis: true */

    var vm = this;

    vm.stoList = [];

    vm.activeCto = {};
    vm.millage = 0;
    vm.services = [];
    //vm.messages = [];
    vm.guruInfo = {};
    vm.showPoll = false;
    vm.pollDone = pollDone;
    vm.userAuto = [];

    activate();

////////////////

    function activate() {
        getGuruInfo().then(function(guruInfo){
            console.log(guruInfo);
            if (!guruInfo.auto.id) {
                vm.showPoll = true;
                getAutos().then(function(){
                    // устанавливаем выбранным элементом первый из доступных автомобилей
                    vm.userAuto = vm.autos[0];
                })
            } else {
                getStoList();
            }
        });

        //console.log('activate');
        /*getMillage().then(function (millage) {
            //console.log();
            if (millage !== 0) {
                getLongPoll();
            }
        })*/
    }

    function getMillage() {
        return Guru.getGuruInfo().then(function (response) {
            vm.millage = response.millage;
            return vm.millage;
        })
    }

    function getLongPoll() {
        return Chat.getLongPoll().then(function (response) {
            vm.services = response;
            console.log(response);
            return vm.services;
        })
    }

    function getStoList() {
        return Sto.getStoList().then(function(response) {
            vm.stoList = response;
            console.log(response);
            return vm.stoList;
        })
    }

    function getGuruInfo() {
        return Guru.getGuruInfo().then(function(response) {
            console.log(response);
            vm.guruInfo = response;
            return vm.guruInfo;
        })
    }

    function pollDone() {
        vm.showPoll = false;
        var info = {
            auto: vm.userAuto
        };
        Guru.setGuruInfo(info);
        Guru.setMilage(vm.userAuto.distance);
        getStoList();
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

}