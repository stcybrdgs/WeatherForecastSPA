// HOME CONTROLLER ---------------------------
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', 'numDaysService', function ($scope, $location, cityService, numDaysService) {
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
    
    $scope.submit = function () {
        $location.path('/forecast');
    }
}]);

// FORECAST CONTROLLER ------------------------
weatherApp.controller('forecastController', ['$scope', 'cityService', 'numDaysService', 'weatherService',function ($scope, cityService, numDaysService, weatherService) {
    $scope.city = cityService.city;
    $scope.hashDays = window.location.hash.slice(-2);
    if($scope.hashDays.slice(0,1) == "/"){
        $scope.hashDays = $scope.hashDays.slice(-1);
    }
    else if($scope.hashDays.slice(0,1) == "s"){
        $scope.hashDays = numDaysService.numDays;
    }
    
    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.hashDays);
     
    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8*(degK - 273)) + 32);
    }
    
    $scope.convertToDate = function (dt) {
        return new Date(dt*1000);
    }

    console.log($scope.weatherResult);  // testing output
}]);