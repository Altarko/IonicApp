angular
    .module('STO')
    .controller('StepFinishCtrl', StepFinishCtrl);

StepFinishCtrl.$inject = ['guruinfo'];

/* @ngInject */
function StepFinishCtrl(guruinfo) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;

    vm.results = {};

    activate();

    ////////////////

    function activate() {
        getGuruResult();
    }

    function getGuruResult() {
        return guruinfo.getGuruResult().then(function(data){
            vm.results = data;
            console.log(data);
            return vm.results;
        })
    }


}