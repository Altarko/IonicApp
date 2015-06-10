angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    

/*    .controller('ServicesCtrl', function($scope) {
        $scope.autoservices = [
            { title: 'Поморка', id: 0, web: 'www.pomorka.ru', address: 'ул. Поморская, 48А стр. 8, Москва', phone: '8 (495) 748-88-52', about:'Наш автосервис работает с 2002 года. История сервиса берет свое начинало с небольшого гаража в городе Долгопрудный, в котором была мастерская по ремонту и продаже' },
            { title: 'Техцентр Сервис-Авто ООО', id: 1, web: 'servavto.ru', address: 'Москворечье ул., 2Ж, Москва', phone: '8 (495) 725-42-35', about:'Сервис основан в 1992 году и по сей день с успехом оказывает услуги в области диагностики, ремонта, продажи запасных частей. Мы специализируемся на постгарантийном ремонте автомобилей Мазда и Форд.' },
            { title: 'Автосервис "Точка Ф"', id: 2, web: 'www.ford-am.ru', address: 'Автомобильный пр-д, 4, Москва', phone: '8 (495) 983-08-90', about:'Мы сделали наш клубный автосервис Форд, потому, что устали от наплевательского отношения к своим "железным коням" у всякого рода проходимцев.' },
            { title: 'Bravo', id: 3 },
            { title: 'Charlie', id: 4 },
            { title: 'Delta', id: 5 },
            { title: 'Echo', id: 6 },
            { title: 'Foxtrot', id: 7 }
        ];
    })*/



    .controller('SingleServiceCtrl', function ($scope, $state) {

    });


