angular.module('starter.services', [])

    .factory('Chats', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var chats = [{
        id: 0,
        name: 'Поморка',
        lastText: 'Какие вопросы?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
      }, {
        id: 1,
        name: 'Техцентр Сервис-Авто ООО',
        lastText: 'Мы можем помочь',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
      }, {
        id: 2,
        name: 'Автосервис "Точка Ф"',
        lastText: '...',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
      }, {
        id: 3,
        name: 'Bravo',
        lastText: 'Ваш заказ номер 43561',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
      }, {
        id: 4,
        name: 'Charlie',
        lastText: 'Добрый день!',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
      }];

      return {
        all: function() {
          return chats;
        },
        remove: function(chat) {
          chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
          for (var i = 0; i < chats.length; i++) {
            if (chats[i].id === parseInt(chatId)) {
              return chats[i];
            }
          }
          return null;
        }
      };
    });
