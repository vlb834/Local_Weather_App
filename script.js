// Geolocation Code Resources: 
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
// https://www.sitepoint.com/html5-geolocation/ - Code from this site.
// http://youmightnotneedjquery.com/ 

function getCurrentWeather(latitude, longitude) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            var weatherData = JSON.parse(this.response);
            console.log(weatherData);
        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();
}

function showPosition(position) {
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

// JS FOR PAGE LOAD - retrieve location// 

function run() {

    if (navigator.geolocation) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocation is not supported in your browser');
    }


}
// in case the document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
// IE <= 8
else document.attachEvent('onreadystatechange', function () {
    if (document.readyState == 'complete') run();
});