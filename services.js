// SERVICES ---------------------------
weatherApp.service('cityService', function () {
    this.city = "New York, NY";
});

weatherApp.service('numDaysService', function () {
   this.numDays = 2; 
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
    this.getWeather = function (city, hashDays) {
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=2cnt&appid=481418de02aad1855734222ebf3ad080", {
        callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});     
        return weatherAPI.get({ q: city, cnt: hashDays });    
    };
}]);
