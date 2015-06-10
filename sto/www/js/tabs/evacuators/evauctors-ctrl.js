angular
    .module('STO')
    .controller('EvacuatorsCtrl', EvacuatorsCtrl);

EvacuatorsCtrl.$inject = ['evacuators'];

/* @ngInject */
function EvacuatorsCtrl(evacuators) {
    /* jshint validthis: true */
    var vm = this;

    vm.evacuators = [];                     // ?????? ???????????
    vm.callMe = callMe;

    activate();

    ////////////////

    function activate() {
        getEvacuators();
    }

    function getEvacuators() {
        return evacuators.getEvacuators().then(function(response) {
            vm.evacuators = response;
            console.log(response);
            return vm.evacuators;
        })
    }

    function callMe(phone) {
        window.open('tel:' + phone);
    }



}