angular
    .module('STO')
    .factory('getNewQuestion', getNewQuestion);

getNewQuestion.$inject = ['$http', 'config'];

/* @ngInject */
function getNewQuestion($http, config) {
    var service = {
        getNewQuestionPost: getNewQuestionPost
    };

    return service;

    ////////////////

    function getNewQuestionPost(dataPost) {
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_new_question',
            method: "POST",
            //withCredentials: true,
            data: dataPost,
            headers: {
                'Content-Type' :'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'/*,
                 'Set-Cookies': 'JSESSIONID=b80dce131dad765177f0e45110e1'*/
            }
        })
            .then(getMComplete)
            .catch(getMFailed);

        function getMComplete(response) {
            console.log(response.data.data2[0]);
            return (response.data.data2[0]);
        }

        function getMFailed(error) {
            return (error.data = 'Ошибка получения ответа по диагностике');
        }
    }


}
