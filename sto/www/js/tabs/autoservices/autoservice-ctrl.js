angular
    .module('STO')
    .controller('AutoservicesCtrl', AutoservicesCtrl);

AutoservicesCtrl.$inject = ['$scope', '$http', 'autoservices', '$cordovaInAppBrowser', '$cookies', '$window', 'cookieStore'];

/* @ngInject */
function AutoservicesCtrl($scope, $http, autoservices, $cordovaInAppBrowser, $cookies, $window, cookieStore) {
    /* jshint validthis: true */
    var vm = this;

    vm.autoservices = [];
    vm.inputText = '';
    vm.externalLink = externalLink;
    vm.callMe = callMe;
    vm.cors = cors;
    vm.autocors = [];
    vm.openGeo = openGeo;
    vm.refreshSTO = refreshSTO;

    vm.corstestdata = [];


    activate();

    ////////////////

    function activate() {
        /*$cookies.put('JSESSIONID', '43e7cf24ef8ea792de136a83afda');
        var cookie = $cookies.JSESSIONID; // suppose you already set $cookies.myCookie= 'xxx';
        console.log();
        $http.defaults.headers.post.Cookies = cookie;*/
        // Retrieving a cookie
       //var cookie = $cookies.JSESSIONID;
        // Setting a cookie
        //$cookies.JSESSIONID = 'JSESSIONID=761f6e2458660aa2bfe10ac8d573';

        getAutoservices();
        /*cookieStore.put("JSESSIONID", "bc53950ebccd24113e548ab0e341");
        return cors().then(function(response) {
            vm.corstestdata = response;
            return vm.corstestdata
        });*/
    }


    /**
     *
     * @returns {*}
     */
    function getAutoservices() {
        return autoservices.getAutoServices().then(function(response) {
            vm.autoservices = response;
            console.log(response);
            return vm.autoservices;
        })
    }

    function externalLink(link) {
        window.open(link, '_system', 'location=yes');
        //window.open(link, '_system');

    }

    $window.OpenLink = function(link) {
        window.open( link, '_system');
    };

    function callMe(phone) {
        //console.log(elem);
        //window.open(555, '_system', 'location=yes')
        window.open('tel:' + phone);
    }

    function cors() {
        return autoservices.getAutoServicesCORS().then(function(response) {
            vm.autocors = response;
            console.log(response);
            return vm.autocors;
        })
    }

    function openGeo(latitude, longitude) {
        window.open("http://maps.google.com/?q=" + latitude + ',' + longitude, "_system");
    }

    function refreshSTO() {
        //console.log('Обновление данных');
        $scope.$broadcast('scroll.refreshComplete');
        console.log('Обновление данных');
        activate();
    }


}