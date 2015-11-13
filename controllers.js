// HOME CONTROLLER ---------------------------
weatherApp.controller('homeController', ['$scope', 'cityService', 'numDaysService', function ($scope, cityService, numDaysService) {
    // var to hold user-entered city
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
       cityService.city = $scope.city; 
    });
    
    // var to hold user-entered # days in forecast
    $scope.numDays = numDaysService.numDays;
    $scope.$watch('numDays', function () {
        numDaysService.numDays = $scope.numDays;
        
        // if user-entered days are invalid, default to 2-day forecast
        if( numDaysService.numDays < 1 || 
                numDaysService.numDays > 16 ){
            numDaysService.numDays = 2;  
        }
    });
}]);

// FORECAST CONTROLLER ------------------------
weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', 'numDaysService', function ($scope, $resource, cityService, numDaysService) {
    $scope.city = cityService.city;
    $scope.hashDays = window.location.hash.slice(-2);
    if($scope.hashDays.slice(0,1) == "/"){
        $scope.hashDays = $scope.hashDays.slice(-1);
    }
    else if($scope.hashDays.slice(0,1) == "s"){
        $scope.hashDays = numDaysService.numDays;
    }
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=2cnt&appid=481418de02aad1855734222ebf3ad080", {
callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});     
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.hashDays });
    
    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8*(degK - 273)) + 32);
    }
    
    $scope.convertToDate = function (dt) {
        return new Date(dt*1000);
    }

    console.log($scope.weatherResult);  // testing output
}]);