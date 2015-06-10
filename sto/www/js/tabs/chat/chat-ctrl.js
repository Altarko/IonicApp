angular
    .module('STO')
    .controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['$scope', 'autoservices', '$timeout', '$ionicScrollDelegate'];

/* @ngInject */
function ChatCtrl($scope, autoservices, $timeout, $ionicScrollDelegate) {
    /* jshint validthis: true */

    var vm = this;

    activate();

    vm.hideTime = false;

    var alternate,
        isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    vm.sendMessage = function () {
        alternate = !alternate;

        var d = new Date();
        d = d.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

        vm.messages.push({
            userId: alternate ? '12345' : '54321',
            text: vm.data.message,
            time: d
        });

        console.log(vm.messages);
        delete vm.data.message;
        $ionicScrollDelegate.scrollBottom(true);

    };


    vm.inputUp = function () {
        if (isIOS) vm.data.keyboardHeight = 216;
        $timeout(function () {
            $ionicScrollDelegate.scrollBottom(true);
        }, 300);

    };

    vm.inputDown = function () {
        if (isIOS) vm.data.keyboardHeight = 0;
        $ionicScrollDelegate.resize();
    };

    $scope.closeKeyboard = function () {
        // cordova.plugins.Keyboard.close();
    };


    vm.data = {};
    vm.myId = '12345';
    vm.messages = [{
        text: "Test 1",
        time: "16:53",
        userId: "12345"
    },
        {
            text: "Test 2",
            time: "16:53",
            userId: "54321"
        },
        {
            text: "Test 3",
            time: "16:53",
            userId: "12345"
        }];


    ////////////////

    function activate() {
    }


}