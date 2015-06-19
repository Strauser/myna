angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope, $rootScope, $state) {
    $rootScope.$on('$ionicView.beforeEnter', function() {
        $rootScope.hideTabs = false;
        if ($state.current.name === 'tab.video') {
            $rootScope.hideTabs = true;
        }
    });
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

    $scope.more = function() {
        CURRENT_PAGE += 1;
        $scope.refresh(CURRENT_PAGE);
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

}])

.controller('ytCtrl', ['$scope', 'ytService', function($scope, ytService) {

    var NEXT_PAGE = "";

    var nextVids = [];
    $scope.vids = [];

    $scope.refresh = function(page) {
        nextVids.forEach( function(vid) {
            $scope.vids.push(vid);
        })

        prepareVids(page);
    }

    prepareVids = function(page) {
        nextVids = [];
        ytService.all(page).success( function(data) {
            NEXT_PAGE = data.nextPageToken;
            data.items.forEach(function(vid) {
                nextVids.push(vid);
            })
        });
    }

    firstLoad = function() {
        nextVids = [];
        ytService.all("").success( function(data) {
            NEXT_PAGE = data.nextPageToken;
            data.items.forEach(function(vid) {
                nextVids.push(vid);
            })
            $scope.more();
        });
    }

    $scope.more = function() {
        $scope.refresh(NEXT_PAGE);
    }

    firstLoad();

}])


.controller('vidCtrl', ['$scope', '$stateParams', '$sce', 'ytService', function($scope, $stateParams, $sce, ytService) {

    $scope.url = "http://www.youtube.com/embed/" + $stateParams.vidId;

}]);
