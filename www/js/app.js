// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('tab.blog', {
        url: '/blog',
        views: {
            'tab-blog': {
                templateUrl: 'templates/tab-blog.html',
                controller: 'blogCtrl'
            }
        }
    })

    .state('tab.blog-post', {
        url: '/posts/:postId',
        views: {
            'tab-blog': {
                templateUrl: 'templates/tab-post.html',
                controller: 'postCtrl'
            }
        }
    })

    .state('tab.youtube', {
        url: '/yt',
        views: {
            'tab-yt': {
                templateUrl: 'templates/tab-yt.html',
                controller: 'ytCtrl'
            }
        }
    })

    .state('tab.video', {
        url: '/yt/:vidId',
        views: {
            'tab-yt': {
                templateUrl: 'templates/tab-vid.html',
                controller: 'vidCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/blog');

})

.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    }
}]);
