angular
    .module('STO')
    .factory('currentUser', currentUser);

currentUser.$inject = ['$q'];

/* @ngInject */
function currentUser($q) {

    var profile = {
        username: '',
        account_id: '',
        session_id: '',
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
        profile.session_id = data.session_id;
        console.log(profile);
    }

    function getProfile() {
        return $q.when(profile);
    }



}
