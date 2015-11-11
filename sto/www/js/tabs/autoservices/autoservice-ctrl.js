angular
    .module('STO')
    .controller('AutoservicesCtrl', AutoservicesCtrl);

/* @ngInject */
function AutoservicesCtrl($scope, autoservices, $window, Sto) {
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
        getAutoservices();
    }

    /**
     *
     * @returns {*}
     */
    function getAutoservices() {
        return Sto.getStoList().then(function(response) {
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