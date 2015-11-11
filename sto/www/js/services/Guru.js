/**
 * Сервис для работы с диалогом гуру
 */

angular
    .module('STO')
    .factory('Guru', Guru);

Guru.$inject = ['$http', '$q', 'addData', 'config', 'formEncode'];

/* @ngInject */
function Guru($http, $q, addData, config, formEncode) {

    var guruInfo = {
        session_key: null,
        account_id: null,
        auto: {},                           // выбранный пользователем автомобиль
        userGlobalDefectTypes: {},          // тип неисправности (авто или владелец)
        userDefect: null,                   // id выбранного дефекта неисправности из списка неисправностей
        context_id: null,
        context_scale_id: null,
        contexts: [],
        contextsScale: [],
        results: {},
        millage: 0
    };

    var service = {
        setGuruInfo: setGuruInfo,
        getGuruInfo: getGuruInfo,
        setMilage: setMilage,
        getGlobalDefectTypes: getGlobalDefectTypes,
        getDefectsList: getDefectsList,
        getContexts: getContexts,
        getContextScales: getContextScales,
        setUserProblem: setUserProblem,
        getNewQuestion: getNewQuestion,
        getNewSession: getNewSession
    };

    return service;


    function setGuruInfo(info) {
        _.extend(guruInfo, info);
        //console.log(guruInfo);
    }

    function getGuruInfo() {
        return $q.when(guruInfo);
    }

    /**
     * Получение глобальных типов неисправностей
     * ( диагностируемых автомобилем или пользователем)
     */

    function getGlobalDefectTypes() {
        //fixme посмотреть проверку логина в каждом запросе
        var dataPost = addData.addData();
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_defect_types',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getDComplete)
            .catch(getDFailed);

        function getDComplete(response) {
            return response.data.data2;
        }

        function getDFailed(error) {
            return (error.data = 'Ошибка получения типов неисправностей');
        }
    }

    /**
     * Сохранение пробега пользователя
     */

    function setMilage(milage) {
        guruInfo.millage = milage;

        var dataPost = formEncode.encode({
            session_id: guruInfo.session_key,
            account_id: guruInfo.account_id,
            milage: guruInfo.millage,
            curTsId: guruInfo.auto.id,
            curTsIndex: 0
        });

        return $http({
            url: config.url + '/ctoweb/rest/get_entities/set_milage',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getMComplete)
            .catch(getMFailed);

        function getMComplete(response) {
            return (response.data);
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка передачи пробега');
        }
    }

    /**
     * Запрашивает список неисправностей, в зависимости от глобального типа неисправности
     */

    function getDefectsList() {

        var dataPost = formEncode.encode({
            session_id: guruInfo.session_key,
            account_id: guruInfo.account_id,
            defect_type_id: guruInfo.userGlobalDefectTypes
        });

        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_defects',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getLComplete)
            .catch(getLFailed);

        function getLComplete(response) {
            return (response.data.data);
        }

        function getLFailed(error) {
            return (error.data = 'Ошибка получения списка неисправностей');
        }
    }

    /**
     * Запрашиваем конткест неисправности (дополнительный диалог)
     */

    function getContexts() {

        //guruInfo.userDefect = userDefectId;

        var dataPost = formEncode.encode({
            session_id: guruInfo.session_key,
            account_id: guruInfo.account_id,
            defect_id: guruInfo.userDefect
        });


        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_contexts',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getMComplete)
            .catch(getMFailed);


        function getMComplete(response) {
            guruInfo.contexts = response.data.data;
            return (guruInfo.contexts );
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка передачи контекста');
        }
    }

    /**
     * Отправляем результаты диагностики
     */

    function setUserProblem(step) {
        var dataPost = '';

        switch (step) {
            case '4':
                dataPost = formEncode.encode({
                    session_id: guruInfo.session_key,
                    account_id: guruInfo.account_id,
                    defect_id: guruInfo.userDefect,
                    curTsId: guruInfo.auto.id
                });
                break;
            case '5':
                dataPost = formEncode.encode({
                    session_id: guruInfo.session_key,
                    account_id: guruInfo.account_id,
                    defect_id: guruInfo.userDefect,
                    context_id: guruInfo.context_id,
                    curTsId: guruInfo.auto.id
                });
                break;
            case '6':
                dataPost = formEncode.encode({
                    session_id: guruInfo.session_key,
                    account_id: guruInfo.account_id,
                    defect_id: guruInfo.userDefect,
                    context_id: guruInfo.context_id,
                    context_scale_id: guruInfo.context_scale_id,
                    curTsId: guruInfo.auto.id
                });
                break;

        }

        console.log(dataPost);
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/set_user_problem',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getMComplete)
            .catch(getMFailed);

        function getMComplete(response) {
            return (response.data);
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка передачи данных о проблеме');
        }
    }

    /**
     * Результаты диагностики
     */

    function getNewQuestion() {

        var dataPost = formEncode.encode({
            account_id: guruInfo.account_id,
            session_key: guruInfo.session_key
        });

        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_new_question',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getMComplete)
            .catch(getMFailed);

        function getMComplete(response) {
            //console.log(response.data.data2[0]);
            guruInfo.results = response.data.data2[0];
            return (response.data.data2[0]);
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка получения ответа по диагностике');
        }
    }

    /**
     * Запрашиваем дополнительный контекст
     */
    function getContextScales() {

        var dataPost = formEncode.encode({
            session_id: guruInfo.session_key,
            account_id: guruInfo.account_id,
            context_id: guruInfo.context_id
        });

        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_context_scales',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getMComplete)
            .catch(getMFailed);


        function getMComplete(response) {
            //console.log(response);
            guruInfo.contextsScale = response.data.data;
            console.log(guruInfo.contextsScale);
            return (guruInfo.contextsScale);
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка передачи контекста');
        }
    }

    function getNewSession() {
        var dataPost = formEncode.encode({
            session_id: guruInfo.session_key,
            account_id: guruInfo.account_id
        });
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_new_session_id',
            method: "POST",
            data: dataPost,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
        })
            .then(getNSComplete)
            .catch(getNSFailed);


        function getNSComplete(response) {
            guruInfo.session_key = Number(response.data.sessionKey);
            console.log(guruInfo);
            return (response);
        }

        function getNSFailed(error) {
            return (error.data = 'Ошибка получения новой сессии');
        }
    }
}
