angular
    .module('STO')
    .controller('ChatDetailCtrl', ChatDetailCtrl);

//ChatDetailCtrl.$inject = ['$scope', '$timeout', '$ionicScrollDelegate', 'Chat', '$stateParams', 'Guru'];

/* @ngInject */
function ChatDetailCtrl($scope, $timeout, $ionicScrollDelegate, Chat, $stateParams, Guru, $interval, Sto) {
    /* jshint validthis: true */

    var vm = this;
    var ctoId = $stateParams.chatId;

    vm.getMessages = getMessages;
    vm.activeCto = {};
    vm.hideTime = false;

    vm.sendMessage = sendMessage;

    var alternate,
        isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();


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
    vm.myId = null;
    vm.messages = [];
    vm.guruInfo = {};
    vm.stoList = [];

    var stoConvertedList = {};

    var interval;

    activate();

////////////////

    function activate() {
        getMessages();
        getGuruInfo();
        getStoList();
        interval = $interval(function () {
            getLongPoll()
        }, 5000)
    }


    function getMessages() {
        return Chat.getMessages(ctoId).then(function (response) {
            vm.messages = response;
            return vm.messages
        })
    }

    function getStoList() {
        return Sto.getStoList().then(function (response) {
            vm.stoList = response;
            console.log(response);
            convertStoList();
            return vm.stoList;
        })
    }

    function convertMessages(messages) {
        var l = messages.length;
        /*while (l --) {
         messages[l]
         }*/
    }

    function sendMessage() {
        alternate = !alternate;

        var d = new Date();
        d = d.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

        console.log(d);
        vm.messages.push({
            userId: alternate ? '12345' : '54321',
            text: vm.data.message,
            time: d,
            sender: vm.myId,
            date: d
        });

        var sendData = {
            sto_id: ctoId,
            cur_ts_id: vm.guruInfo.auto.id,
            text: vm.data.message
        };
        //console.log(sendData);
        Chat.sendText(sendData);

        delete vm.data.message;
        $ionicScrollDelegate.scrollBottom(true);

    }

    function getGuruInfo() {
        return Guru.getGuruInfo().then(function (response) {
            vm.guruInfo = response;
            vm.myId = response.account_id;
            return vm.guruInfo;
        })
    }

    function getLongPoll() {
        return Chat.getLongPoll().then(function (response) {
            if (response) {
                console.log(response);
                vm.messages.push(response)
            }

        })
    }

    function convertStoList() {
        for (var i = 0, l = vm.stoList.length; i < l; i += 1) {
            var a = vm.stoList[i].sto_id;
            stoConvertedList[a] = {
                name: vm.stoList[i].sto_name,
                state: '',
                address: vm.stoList[i].sto_addr,
                region_id: vm.stoList[i].region_id,
                sto_lat: vm.stoList[i].sto_lat,
                sto_lon: vm.stoList[i].sto_lon,
                sto_url: vm.stoList[i].sto_url
            }
        }
    }

}