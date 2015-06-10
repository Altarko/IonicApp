angular
    .module('STO')
    .controller('SingleCar', SingleCar);

SingleCar.$inject = ['userautos', '$stateParams'];

/* @ngInject */
function SingleCar(userautos, $stateParams) {
    /* jshint validthis: true */
    var vm = this;

    var carId = Number($stateParams.carId);
    vm.currentAuto = {};

    activate();

    ////////////////

    function activate() {
        getAutoId();
    }

    function getAutoId() {
        return userautos.getAutoId(carId).then(function(response) {
            vm.currentAuto = response;
            console.log(response);
            return vm.currentAuto;
        })
    }

    
}