angular
    .module('STO')
    .controller('AccountCtrl', AccountCtrl);

AccountCtrl.$inject = ['userautos'];

/* @ngInject */
function AccountCtrl(userautos) {
    /* jshint validthis: true */
    var vm = this;
    activate();
    vm.userAutos = [];                      // ?????? ??????????? ????????????

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



}