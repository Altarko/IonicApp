/**
 * Шаг 4 - выбор неисправности в зависимости от типа
 */
angular
    .module('STO')
    .controller('Step4Defects', Step4Defects);

Step4Defects.$inject = [
    'Guru',
    '$scope'];

/* @ngInject */
function Step4Defects(Guru, $scope) {
    /* jshint validthis: true */
    var vm = this;

    var guruResults = {};

    vm.activate = activate;

    vm.defects = [];                                // массив неисправностей
    vm.userDefect = {};                             // выбранная пользователем неиспавность
    vm.redirectUrl = '';


    activate();

    ////////////////

    function activate() {
        getDefects().then(function () {
            // устанавливает селект по умолчанию
            vm.userDefect = vm.defects[0];
        });
        Guru.setGuruInfo({
            context_id: null,
            context_scale_id: null,
            results: {}
        })
    }

    $scope.$on("$ionicView.enter", function() {
        activate()
    });


    /**
     * Запрашиват список неисправностей в зависимости от выбранного глобального типа (на прошлом шаге)
     * (диагностируемые автомобилем или пользователем)
     */
    function getDefects() {
        return Guru.getDefectsList().then(function (response) {
            vm.defects = response;
            return vm.defects;
        })
    }

    function setUserProb() {
        //console.log('setUserProb');
        return Guru.setUserProblem('4').then(function (response) {
            return response;
        })
    }

    // следим за получением результатов
    $scope.$watch('vm.guruResults', function (newVal, oldVal) {
        console.log('получены результаты');
        Guru.setGuruInfo({
            results: vm.guruResults
        });

    });

    // следим за изменением выбранного дефекта, чтобы запустить функцию проверки наличия контекста -
    // дополнительного диалогового окна.
    $scope.$watch('vm.userDefect', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log('изменили неисправность');
            defectSelected();
        }
    });

    /**
     * Запрашивает контект неисправности
     * @define Возвращает true если есть контекст
     * @returns {*}
     */
    function getCont() {
        return Guru.getContexts().then(function (response) {
            return !!response.length;
        })
    }

    function defectSelected() {
        Guru.setGuruInfo({
            userDefect: vm.userDefect.id
        });
        /*Guru.setGuruInfo({
            context_id: null,
            context_scale_id: null,
            results: {}
        });*/
        getCont()
            .then(function (response) {
                if (response) {
                    console.log('продолжаем диалог');
                    vm.redirectUrl = 'step5';
                } else {
                    vm.redirectUrl = 'result';
                    //console.log('запрашиваем результат');
                    return setUserProb().then(function () {
                        // тащим ответ по диагностике
                        return Guru.getNewQuestion().then(function (response) {
                            vm.guruResults = response;
                            //console.log(vm.guruResults);
                            return vm.guruResults;
                        })
                    })
                }
            })
    }
}