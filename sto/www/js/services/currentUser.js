angular
    .module('STO')
    .factory('currentUser', currentUser);

currentUser.$inject = ['$q'];

/* @ngInject */
function currentUser($q) {

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
        getProfile: getProfile,
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

    function getProfile() {
        return $q.when(profile);
    }



}
