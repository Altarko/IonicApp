angular
    .module('STO')
    .controller('Step5Context', Step5Context);

Step5Context.$inject = ['Guru', '$scope'];

/* @ngInject */
function Step5Context(Guru, $scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.userDefectContext = '';
    vm.defectContext = [];
    vm.guruResults = {};
    vm.redirectUrl = '';
    vm.nextStep = nextStep;

    activate();

    ////////////////

    function activate() {
        getContext().then(function () {
            vm.userDefectContext = vm.defectContext[0];
        });
        Guru.setGuruInfo({
            context_scale_id: null,
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
    function getContext() {
        return Guru.getContexts().then(function (response) {
            vm.defectContext = response;
            console.log(vm.defectContext);
            return vm.defectContext;
        })
    }


    function setUserProb() {
        return Guru.setUserProblem('5').then(function (response) {
            return response;
        })
    }

    function next() {
        return Guru.setUserProblem('5-next').then(function (response) {
            return response;
        })
    }

    function nextStep() {
        console.log('next-ctrl');
        vm.redirectUrl = 'result';
        console.log('запрашиваем результат');
        next().then(function () {
            // тащим ответ по диагностике
            return Guru.getNewQuestion().then(function (response) {
                vm.guruResults = response;
                return vm.guruResults;
            })
        })
    }

    // следим за получением результатов
    $scope.$watch('vm.guruResults', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            console.log('получены результаты');
            Guru.setGuruInfo({
                results: vm.guruResults
            });
        }
    });

    // следим за изменением выбранного контекста дефекта, чтобы запустить функцию проверки наличия контекста -
    // дополнительного диалогового окна.
    $scope.$watch('vm.userDefectContext', function (newVal, oldVal) {
        if (newVal !== oldVal) {
        //console.log('changed');
        contextSelected();
        }
    });

    /**
     * Запрашивает контект неисправности
     * @define Возвращает true если есть дополнителньый контекст (contextscale)
     * @returns {*}
     */
    function getContextScales() {
        return Guru.getContextScales().then(function (response) {
            return !!response.length;
        })
    }

    function contextSelected() {
        Guru.setGuruInfo({
            context_id: vm.userDefectContext.id
        });
        /*Guru.setGuruInfo({
            context_scale_id: null,
            results: {}
        });*/
        getContextScales()
            .then(function (response) {
                if (response) {
                    console.log('продолжаем диалог');
                    vm.redirectUrl = 'step6';
                } else {
                    vm.redirectUrl = 'result';
                    console.log('запрашиваем результат');
                    setUserProb().then(function () {
                        // тащим ответ по диагностике
                        return Guru.getNewQuestion().then(function (response) {
                            console.log(response);
                            if (response.msg) {
                                console.log('Конец!');
                                vm.redirectUrl = 'result';
                            } else {
                                vm.redirectUrl = 'yes-no';
                            }
                            vm.guruResults = response;
                            return vm.guruResults;
                        })
                    })
                }
            })
    }

}