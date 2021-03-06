angular.module('starter.services', [])

    .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Andrew Jostlin',
        lastText: 'Did you get the ice cream?',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
        id: 3,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 9,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
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
})

.factory('blogService', ['$http', function($http) {

    return {
        all: function(page) {
            return $http.get("http://fashionail.bijoux-faits-main.com/wp-json/posts?filter[posts_per_page]=5&page=" + page);
        },
        post: function(id) {
            return $http.get("http://fashionail.bijoux-faits-main.com/wp-json/posts/" + id);
        }
    };

}])

.factory('ytService', ['$http', function($http) {

    var channelId = "UCW3IEcIYhBFJJ5OFE54OMWA";
    var apikey = "AIzaSyBnIXOHSlUN9IOhf7vckZZLEnXbifSxVR8";

    return {
        all: function(page) {
            return $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&channelId=" + channelId + "&key=" + apikey + "&pageToken=" + page);
        },
        video: function(id) {
            return $http.get("https://www.googleapis.com/youtube/v3/videos?part=snippet+%2C+player&id=" + id + "&key=" + apikey);
        }
    };

}]);
