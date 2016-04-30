angular
    .module('STO')
    .controller('AccountCtrl', AccountCtrl);


/* @ngInject */
function AccountCtrl(userautos, $state, Guru, Account) {
    /* jshint validthis: true */
    var vm = this;
    vm.userInfo = {};

    activate();
    vm.userAutos = [];                      // ?????? ??????????? ????????????
    vm.backToGuru = backToGuru;

    ////////////////

    function activate() {
        getUserAutos();
        getAccInfo();
    }

    function getUserAutos() {
        return userautos.getAutos().then(function (response) {
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

    function getAccInfo() {
        return Account.getAccountInfo().then(function (response) {
            console.log(response);
            vm.userInfo = response[0];
            return vm.userInfo;
        })
    }


}