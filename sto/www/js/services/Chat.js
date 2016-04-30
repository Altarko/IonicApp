/**
 * ?????? ??? ?????? ? ???????? ????
 */

angular
    .module('STO')
    .factory('Chat', Chat);

Chat.$inject = ['$http', '$q', 'addData', 'config', 'formEncode', 'currentUser', 'Sto'];

/* @ngInject */
function Chat($http, $q, addData, config, formEncode, currentUser, Sto) {

    var chatInfo = {
        session_key: null,
        account_id: null,
        auto: {},                           // ????????? ????????????? ??????????
        millage: 0
    };

    var GuruFromChat = false;


    var service = {
        getLongPoll: getLongPoll,
        getMessages: getMessages,
        sendText: sendText,
        getGuruFromChat: getGuruFromChat,
        setGuruFromChat: setGuruFromChat
    };

    return service;


    function getLongPoll() {
        var dataPost = formEncode.encode({
            session_id: currentUser.profile.session_id,
            account_id: currentUser.profile.account_id,
            region_id: 9,
            cto_list: JSON.stringify(Sto.getStoConvertedList())
        });
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_long_poll',
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
            return response.data.data[0];
        }

        function getDFailed(error) {
            return (error.data = '?????? ????????? Long poll');
        }
    }

    function getMessages(cto_id) {
        var dataPost = formEncode.encode({
            session_id: currentUser.profile.session_id,
            account_id: currentUser.profile.account_id,
            cto_id: cto_id,
            upToDate: null
        });
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/get_messages',
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
            return response.data.data;
        }

        function getDFailed(error) {
            return (error.data = '?????? getMessages');
        }
    }

    function sendText(data) {
        var dataPost = formEncode.encode({
            session_id: currentUser.profile.session_id,
            account_id: currentUser.profile.account_id,
            sto_id: data.sto_id,
            cur_ts_id: data.cur_ts_id,
            text: data.text
        });
        //console.log(data);
        return $http({
            url: config.url + '/ctoweb/rest/get_entities/send_message',
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
            return response.data.data;
        }

        function getDFailed(error) {
            return (error.data = '?????? sendText');
        }
    }

    function getGuruFromChat() {
        return GuruFromChat;
    }

    function setGuruFromChat(state) {
        setGuruFromChat = state;
    }
}
