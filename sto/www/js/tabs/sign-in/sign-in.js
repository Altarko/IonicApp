angular
    .module('STO')
    .controller('SignInCtrl', SignInCtrl);

SignInCtrl.$inject = ['$state', 'auth'];

/* @ngInject */
function SignInCtrl($state, auth) {
    /* jshint validthis: true */
    var vm = this;

    vm.user = {
        username: 'p2xc90@sto.ru',
        password: 'p2xc90@sto.ru'
    };

    vm.login = function (user) {
        console.log('Sign-In', user);
        //$state.go('tab.guru');
        auth.login(user).then(function(response) {
            if (response.data.success === true) {
                $state.go('tab.guru');
            }
        })
    };

    activate();

    ////////////////

    function activate() {
    }

}