
angular
    .module('STO')
    .factory('addData', addData);

addData.$inject = ['currentUser', 'formEncode'];

/* @ngInject */
function addData(currentUser, formEncode) {
    var service = {
        addData: addData
    };

    return service;

    ////////////////

    function addData() {
        if (currentUser.profile.loggedIn) {
            var data = formEncode.encode({
                session_id: currentUser.profile.session_key,
                account_id: currentUser.profile.account_id
            });
        }
        return data;
    }
}
