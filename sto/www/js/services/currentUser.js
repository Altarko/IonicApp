angular
    .module('STO')
    .factory('currentUser', currentUser);

//currentUser.$inject = [''];

/* @ngInject */
function currentUser() {

    var profile = {
        username: '',
        account_id: '',
        session_key: '',
        get loggedIn() {
            return this.account_id
        }
    };

    var service = {
        setProfile: setProfile,
        profile: profile
    };

    return service;

    ////////////////

    function setProfile(username, data) {
        profile.username = username;
        profile.account_id = data.account_id;
        profile.session_key = data.session_key;
        console.log(profile);
    }



}
