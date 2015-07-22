/**
 * Шаг 4 - выбор неисправности в зависимости от типа
 */
angular
    .module('STO')
    .controller('Step4Defects', Step4Defects);

Step4Defects.$inject = ['guruinfo', 'currentUser', 'formEncode', 'Defects', '$q' ,'getContexts', 'setUserProblem', 'getNewQuestion', '$scope'];

/* @ngInject */
function Step4Defects(guruinfo, currentUser, formEncode, Defects, $q, getContexts, setUserProblem, getNewQuestion, $scope) {
    /* jshint validthis: true */
    var vm = this,
        defecttype = {},
        currentUserInfo = {};

    vm.activate = activate;

    vm.defects = [];                                // массив неисправностей
    vm.userDefect = {};                             // выбранная пользователем неиспавность
    //vm.DefectSelected = DefectSelected;
    vm.userAuto = {};
    vm.redirectUrl = '';
    vm.guruResults = {};

    activate();

    ////////////////

    function activate() {

        // синхронизируем асинхронные запросы
        var promises = [getUserInfo(), getDefectType(), getUserAuto()];

        return $q.all(promises).then(function() {
            // тащим список неисправностей
            getDefects().then(function(){
                // устанавливает селект по умолчанию
                vm.userDefect = vm.defects[0];
            });
        });
    }

    /**
     * Запрашивает данные пользователя
     */
    function getUserInfo() {
        return currentUser.getProfile().then(function (response) {
            currentUserInfo = response;
            console.log(response);
            return currentUserInfo;
        })
    }

    /**
     *  Запрашивает тип несправности, выбранные пользователем на прошлом шаге
     */
    function getDefectType() {
        return guruinfo.getUserDefectType().then(function (response) {
            defecttype = response;
            return response;
        })
    }

    /**
     * Запрашиват неиправности в записимости от выбранного типа неисправности
     */
    function getDefects() {
        var obj = formEncode.encode({
            session_id: currentUserInfo.session_key,
            account_id: currentUserInfo.account_id,
            defect_type_id: defecttype.id
        });
        console.log(obj);
        return Defects.getDefects(obj).then(function (response) {
            vm.defects = response;
            return vm.defects;
        })
    }

    /**
     * Запрашиваем выбранный пользователем автомобиль
     * @returns {*}
     */
    function getUserAuto() {
        return guruinfo.getUserAuto().then(function(response){
            console.log(response);
            vm.userAuto = response;
            return vm.userAuto;
        })
    }



    function getCont() {
        var obj = formEncode.encode({
            session_id: currentUserInfo.session_key,
            account_id: currentUserInfo.account_id,
            defect_id: vm.userDefect.id
        });
        console.log(obj);
        return getContexts.getContextsPost(obj).then(function (response) {
            return response;
        })
    }

    function setUserProb() {
        var obj = formEncode.encode({
            session_id: currentUserInfo.session_key,
            account_id: currentUserInfo.account_id,
            defect_id: vm.userDefect.id,
            curTsId: vm.userAuto.id
        });

        return setUserProblem.setUserProblemPost(obj).then(function (response) {
            console.log(response);
            return response;
        })
    }

    // следим за получением результатов
    $scope.$watch('vm.guruResults', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            console.log('получены результаты');
            guruinfo.setGuruResult(vm.guruResults);
        }

    });

    // следим за изменением выбранного дефекта
    $scope.$watch('vm.userDefect', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log('изменили неисправность');
            defectSelected();
        }

    });

    function defectSelected() {
        // TODO переделать этот пждец, когда Александр ответит об ошибкав в скорости работы приложения
        getCont().then(function(response){
            console.log(response);
            if (response.length !== 0) {
                console.log('продолжаем диалог');
                vm.redirectUrl = '#';
            } else {
                vm.redirectUrl = 'result';
                console.log('запрашиваем результат');
                setUserProb().then(function() {
                    // тащим ответ по диагностике
                    var obj = formEncode.encode({
                        account_id: currentUserInfo.account_id,
                        session_key: currentUserInfo.session_key
                    });
                    console.log(obj);
                    return getNewQuestion.getNewQuestionPost(obj).then(function (response) {
                        vm.guruResults = response;
                        console.log(vm.guruResults);
                        return vm.guruResults;
                    })
                })
            }
        })
    }
}