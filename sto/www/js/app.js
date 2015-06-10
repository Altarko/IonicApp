// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('STO', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngCookies', 'ngBiscuit'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    /*.config(['$httpProvider', function ($httpProvider) {
     // ...

     // delete header from client:
     // http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
     $httpProvider.defaults.useXDomain = true;
     $httpProvider.defaults.withCredentials = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
     }])*/

    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('welcome', {
                url: '/welcome',
                templateUrl: 'templates/welcome.html',
                controller: 'SignInCtrl'
            })

            .state('signin', {
                url: '/sign-in',
                templateUrl: 'js/tabs/sign-in/sign-in.html',
                controller: 'SignInCtrl'
            })

            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.guru', {
                url: '/guru',
                views: {
                    'tab-guru': {
                        templateUrl: 'js/tabs/guru/tab-guru-km.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.guru-whosefault', {
                url: '/guru/whosefault',
                views: {
                    'tab-guru': {
                        templateUrl: 'js/tabs/guru/tab-guru-whosefault.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.guru-owner', {
                url: '/guru/owner',
                views: {
                    'tab-guru': {
                        templateUrl: 'js/tabs/guru/tab-guru-owner.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.guru-car', {
                url: '/guru/car',
                views: {
                    'tab-guru': {
                        templateUrl: 'js/tabs/guru/tab-guru-car.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            // ?????????? ???????????
            .state('tab.guru-result', {
                url: '/guru/result',
                views: {
                    'tab-guru': {
                        templateUrl: 'js/tabs/guru/tab-guru-result.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.guru-evacuators', {
                url: '/guru/evacuators',
                views: {
                    'tab-guru': {
                        templateUrl: 'js/tabs/evacuators/evacuators.html',
                        controller: 'EvacuatorsCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'js/tabs/chat/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.services', {
                url: '/services',
                views: {
                    'tab-services': {
                        templateUrl: 'js/tabs/autoservices/tab-services.html',
                        controller: 'AutoservicesCtrl'
                    }
                }
            })

            .state('tab.service-detail', {
                url: '/services/:serviceId',
                views: {
                    'tab-services': {
                        templateUrl: "templates/single-service.html",
                        controller: 'SingleServiceCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('tab.account-cars', {
                url: '/account/car/:carId',
                views: {
                    'tab-account': {
                        templateUrl: 'js/tabs/mycars/car.html',
                        controller: 'SingleCar'
                    }
                }
            })

            .state('tab.account-cars-report', {
                url: '/account/car/:carId/report/:repId',
                views: {
                    'tab-account': {
                        templateUrl: 'js/tabs/mycars/report.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/welcome');

    })

    .directive('input', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&',
                'onFocus': '&',
                'onBlur': '&'
            },
            link: function (scope, element, attr) {
                element.bind('focus', function (e) {
                    if (scope.onFocus) {
                        $timeout(function () {
                            scope.onFocus();
                        });
                    }
                });
                element.bind('blur', function (e) {
                    if (scope.onBlur) {
                        $timeout(function () {
                            scope.onBlur();
                        });
                    }
                });
                element.bind('keydown', function (e) {
                    if (e.which == 13) {
                        if (scope.returnClose) element[0].blur();
                        if (scope.onReturn) {
                            $timeout(function () {
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    });
