angular
    .module('STO')
    .controller('Step6ContextScales', Step6ContextScales);

Step6ContextScales.$inject = ['Guru', '$scope'];

/* @ngInject */
function Step6ContextScales(Guru, $scope) {
    /* jshint validthis: true */
    var vm = this;


    vm.activate = activate;
    vm.userDefectContextScales = '';
    vm.defectContextScales = [];
    vm.guruResults = '';
    vm.contextScalesSelected = contextScalesSelected;

    activate();

    ////////////////

    function activate() {
        getContextScales().then(function () {
            vm.userDefectContextScales = vm.defectContextScales[0];
        })
        Guru.setGuruInfo({
            results: {}
        })
    }

    $scope.$on("$ionicView.enter", function() {
        activate()
    });

    /**
     * Запрашиваем контекст неисправности
     * @returns {*}
     */
    function getContextScales() {
        return Guru.getContextScales().then(function (response) {
            vm.defectContextScales = response;
            return vm.defectContextScales;
        })
    }

    // следим за изменением выбранного контекста дефекта, чтобы запустить функцию проверки наличия контекста -
    // дополнительного диалогового окна.
    /*$scope.$watch('vm.userDefectContextScales', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            //console.log('changed');
            contextScalesSelected();
        }
    });*/

    // следим за получением результатов
    $scope.$watch('vm.guruResults', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            console.log('получены результаты');
            Guru.setGuruInfo({
                results: vm.guruResults
            });
        }
    });

    function setUserProb() {
        return Guru.setUserProblem('6').then(function (response) {
            return response;
        })
    }

    function contextScalesSelected() {
        Guru.setGuruInfo({
            context_scale_id: vm.userDefectContextScales.id
        });
        Guru.setGuruInfo({
            results: {}
        });
        vm.redirectUrl = 'result';
        console.log('запрашиваем результат');
        setUserProb().then(function () {
            // тащим ответ по диагностике
            return Guru.getNewQuestion().then(function (response) {
                vm.guruResults = response;
                return vm.guruResults;
            })
        })
    }


}