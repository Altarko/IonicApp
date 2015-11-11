angular
    .module('STO')
    .controller('StepFinishCtrl', StepFinishCtrl);

StepFinishCtrl.$inject = ['Guru', '$ionicNavBarDelegate', '$scope'];

/* @ngInject */
function StepFinishCtrl(Guru, $ionicNavBarDelegate, $scope) {
    /* jshint validthis: true */
    var vm = this;

    /*$ionicNavBarDelegate.showBackButton(false);
*/
    vm.activate = activate;
    vm.backToGuru = backToGuru;

    vm.results = {};

    activate();

    ////////////////

    function activate() {
       // getGuruResult();
    }

    function getGuruResult() {
        return Guru.getGuruInfo().then(function (response) {
            vm.results = response.results;
            console.log(response);
            return vm.results;
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
        return Guru.getNewSession();
    }

    $scope.$on("$ionicView.enter", function() {
        getGuruResult()
    });


}