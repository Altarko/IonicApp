/**
 * Шаг диалог да-нет
 */
angular
    .module('STO')
    .controller('YesNo', YesNo);


/* @ngInject */
function YesNo(Guru, $state) {
    /* jshint validthis: true */
    var vm = this;
    vm.guruInfo = {};
    vm.setAnswer = setAnswer;

    activate();

    ////////////////

    function activate() {
        getGuru();
    }

    function getGuru() {
        return Guru.getGuruInfo().then(function (response) {
            console.log(response);
            vm.guruInfo =  response;
            return response;
        })
    }
    
    function setAnswer(answer) {
        return Guru.getNewQuestionYesNo(answer).then(function (response) {
            console.log(response);
            if (response.msg) {
                console.log('Конец!');
                $state.go('tab.guru-result');
            } else {
                vm.guruInfo.results.data2[0].name = response.data2[0].name;
            }
        })
    }



}