
var myApp = angular.module('myModule', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
   .when('/', {
       templateUrl: 'pages/main.html',
       controller: 'mainController'
   })
   .when('/about', {
       templateUrl: 'pages/about.html',
       controller: 'mainController'        
   })
   .when('/form', {
       templateUrl: 'pages/form.html',
       controller: 'mainController'        
   })   
});

myApp.controller('mainController', ['$scope', '$log', function ($scope, $log) {
    $scope.customers = [
        {
            name: 'John Doe',
            address: '555 Main St.',
            city: 'New York',
            state: 'NY',
            zip: '11111'
        },
        {
            name: 'Jane Buttersworth',
            address: '222 Doodle St.',
            city: 'Toledo',
            state: 'OH',
            zip: '22222'
        },
        {
            name: 'Peter Pan',
            address: '123 Gone Way',
            city: 'Never',
            state: 'Neverland',
            zip: '77777'
        }        
    ];
    $scope.formattedAddress = function(customer){
        return  customer.address + ', ' + customer.city + ', ' + customer.state + ', ' + customer.zip;
    };
    $scope.record0 = $scope.formattedAddress($scope.customers[0]);
}]);

myApp.controller('secondController', ['$scope', '$log', function ($scope, $log) {

    
}]);

myApp.directive('searchResult', function() {
   return {
       restrict: 'AECM',
       replace: true,       
       templateUrl: 'directives/searchresult.html',
       scope:{  customerObject: "=",
                formattedAddressFunction: "&"
       },
       transclude: true
   }
});