angular
    .module('STO')
    .controller('Step5ContextScales', Step5ContextScales);

Step5ContextScales.$inject = [''];

/* @ngInject */
function Step5ContextScales() {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'Step5ContextScales';

    activate();

    ////////////////

    function activate() {
    }

    
}