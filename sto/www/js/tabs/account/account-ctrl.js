angular
    .module('STO')
    .controller('AccountCtrl', AccountCtrl);

AccountCtrl.$inject = ['userautos', '$state', 'Guru'];

/* @ngInject */
function AccountCtrl(userautos, $state, Guru) {
    /* jshint validthis: true */
    var vm = this;
    activate();
    vm.userAutos = [];                      // ?????? ??????????? ????????????
    vm.backToGuru = backToGuru;

    ////////////////

    function activate() {
        getUserAutos();
    }

    function getUserAutos() {
        return userautos.getAutos().then(function(response){
            vm.userAutos = response;
            console.log(response);
            return vm.userAutos;
        })
    }

    function backToGuru() {
        vm.results = {};
        Guru.setGuruInfo({
            //userDefect: null,
            context_id: null,
            context_scale_id: null,
            results: {}
        });
        $state.go('signin');
        return Guru.getNewSession();
    }



}