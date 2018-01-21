// Geolocation Code Resources: 
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
// https://www.sitepoint.com/html5-geolocation/ - Code from this site.
// http://youmightnotneedjquery.com/ 


// GLOBAL VARIABLES //
const tempC = "&#176C";
const tempF = "&#176F";
let tempUnit = tempC;
let geolocation = '';
let temp = '';
let tempMax = '';
let tempMin = '';
//let icon = ;
let humidity = '';
let windSpeed = '';
//let windDirection = 
let detailedDescription = '';
let sunRise = '';
let sunSet = '';

function defineWeatherVariables(obj) {
    geolocation = obj['name'];
    temp = obj['main']['temp'] + tempUnit;
    tempMax = obj['main']['temp_max'] + tempUnit;
    tempMin = obj['main']['temp_min'] + tempUnit;
    //icon = ;
    humidity = 'Humidity: ' + obj['main']['humidity'] + '&#37';
    windSpeed = 'Wind: ' + obj['wind']['speed'] + 'km/hr';
    // windDirection = obj['wind']['deg'-.map(x => x['description'])
    // sunRise =
    // sunSet = 
    if (obj['weather'].length > 1) {
        let descriptions = obj['weather'].map(x => x['description']);
        detailedDescription = 'Mix of ';
        for (let x of descriptions) {
            detailedDescription = detailedDescription.concat(x + ', ');
        }
        detailedDescription = detailedDescription.slice(0, detailedDescription.length - 2) + '.';
    } else {
        detailedDescription = obj['weather']['description'];
        detailedDescription = detailedDescription.charAt(0).toUpperCase() + detailedDescription.slice(1);
    }
}


function displayCurrentWeather(obj) {
    defineWeatherVariables(obj);
    document.getElementById("location").innerHTML = geolocation;
    document.getElementById("temperature").innerHTML = temp;
    document.getElementById("description").innerHTML = detailedDescription;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("wind-speed").innerHTML = windSpeed;
    // document.getElementById("wind-direction").innerHTML = windDirection;
    // document.getElementById("sunrise").innerHTML = sunRise;
    // document.getElementById("sunset").innerHTML = sunSet;

}


function getCurrentWeather(latitude, longitude) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            var weatherData = JSON.parse(this.response);
            console.log(weatherData);
            displayCurrentWeather(weatherData);
        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();
}

function usePosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getCurrentWeather(latitude, longitude);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// JS FOR PAGE LOAD - retrieve HTML5 geolocation// 

function run() {

    if (navigator.geolocation) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(usePosition, showError);
    } else {
        alert('Geolocation is not supported in your browser');
    }


}
// in case the document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run());
// IE <= 8
else document.attachEvent('onreadystatechange', function () {
    if (document.readyState == 'complete') run();
});