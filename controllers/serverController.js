var serverApp = angular.module('appServer', ['ngRoute']);

serverApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'pagesServer/home.html',
             controller  : 'homeController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pagesServer/about.html',
             controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pagesServer/contact.html',
             controller  : 'serverController'
        });
});



// create the controller and inject Angular's $scope
serverApp.controller('serverController', function($scope,$http) {




});