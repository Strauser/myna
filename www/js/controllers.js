angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})


.controller('blogCtrl', ['$scope', '$sce', 'blogService', function($scope, $sce, blogService) {

    var CURRENT_PAGE = 1;

    var nextPosts = [];
    $scope.posts = [];

    $scope.refresh = function(page) {
        nextPosts.forEach( function(post) {
            $scope.posts.push(post);
        })

        preparePosts(page);
    }

    preparePosts = function(page) {
        nextPosts = [];
        blogService.all(page).success( function(data) {
            data.forEach(function(d) {
                nextPosts.push(processHtml(d));
            })
        });
    }


    firstLoad = function(page) {
        nextPosts = [];
        blogService.all(page).success( function(data) {
            data.forEach(function(d) {
                nextPosts.push(processHtml(d));
            })
            $scope.more();
        });
    }

    processHtml = function(post) {
        post.shortContent = post.content
            .replace(/<(?:.|\n)*?>/gm, '')
            .replace(/&nbsp;/gm, ' ')
            .replace(/\s+/gm, ' ')
            .substring(1, 100)
            + "...";
        return post;
    }

    $scope.more = function() {
        CURRENT_PAGE += 1;
        $scope.refresh(CURRENT_PAGE);
    }

    $scope.getFirstImg = function(post) {
        var div = document.createElement('div');
        div.innerHTML = post.content;
        var firstImage = div.getElementsByTagName('img')[0]
        var imgSrc = firstImage ? firstImage.src : "";
        var rawImgSrc = firstImage ? firstImage.getAttribute("src") : "";
        return rawImgSrc;
    }

    firstLoad(CURRENT_PAGE);

}])


.controller('postCtrl', ['$scope', '$sce', '$stateParams', 'blogService', function($scope, $sce, $stateParams, blogService) {

    blogService.post($stateParams.postId).success(function(data) {
        $scope.post = data;
        $scope.post.content = $sce.trustAsHtml(post.content);
    });

}]);
