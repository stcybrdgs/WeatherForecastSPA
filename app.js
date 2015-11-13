var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
});

// SERVICES
weatherApp.service('cityService', function () {
    this.city = "New York, NY";
});

weatherApp

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {
    $scope.city = cityService.city;
                                             
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=2cnt&appid=481418de02aad1855734222ebf3ad080", {
callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});     
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 5 });
    
    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8*(degK - 273)) + 32);
    }
    
    $scope.convertToDate = function (dt) {
        return new Date(dt*1000);
    }
}]);