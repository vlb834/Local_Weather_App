// GEOLOCATION CODE RESOURCES: 
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
// https://www.sitepoint.com/html5-geolocation/ - Code from this site.
// http://youmightnotneedjquery.com/ 
// CREDITS:
// windDegtoCardinalDirection courtesy of Pascal's code here: https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words#7490772



// GLOBAL VARIABLES //
const tempC = "&#176C";
const tempF = "&#176F";
let tempUnit = tempC;

function detailedWeatherDescription(obj) {
    if (obj['weather'].length > 1) {
        let descriptions = obj['weather'].map(x => x['description']);
        let weather = 'Mix of ';
        for (let x of descriptions) {
            weather = weather.concat(x + ', ');
        }
        return weather = weather.slice(0, weather.length - 2) + '.';
    } else {
        weather = obj['weather']['description'];
        return weather = weather.charAt(0).toUpperCase() + weather.slice(1);
    }
}

function windDegtoCardinalDirection(obj) {
    //Code via stackoverload - see resources and credits above
    let deg = obj['wind']['deg'];
    while (deg < 0) deg += 360;
    while (deg >= 360) deg -= 360;
    let val = Math.round((deg - 11.25) / 22.5);
    let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[Math.abs(val)];
}

// showing incorret time - need to fix
function daylight(obj, sun) {
    var time = new Date(obj['sys'][sun]);
    return time.toLocaleTimeString(); 
}

function defineWeatherVariables(obj) {
    geolocation = obj['name'];
    temp = Math.round(obj['main']['temp']) + tempUnit;
    detailedDescription = detailedWeatherDescription(obj);
    humidity = 'Humidity: ' + obj['main']['humidity'] + '&#37';
    pressure = 'Pressure: ' + Math.round(obj['main']['pressure']) + ' hPa';
    windSpeed = 'Wind: ' + obj['wind']['speed'] + 'km/hr';
    windDirection = windDegtoCardinalDirection(obj);
    sunRise = daylight(obj, 'sunrise');
    sunSet = daylight(obj, 'sunset');
}

function displayIcons(obj) {
    let icons = obj['weather'].map(x => x['icon']);
    for (let x of icons) {
        if (x !== undefined) {
            let img = new Image();
            img.src = "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F" + [x] + ".png?1499366021399";
            return document.getElementById("icon").appendChild(img);
        }
    }
}

function displayCurrentWeather(obj) {
    defineWeatherVariables(obj);
    displayIcons(obj); // possible multiple icons for variable weather addressed by function
    document.getElementById("location").innerHTML = geolocation;
    document.getElementById("temperature").innerHTML = temp;
    document.getElementById("description").innerHTML = detailedDescription;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("pressure").innerHTML = pressure;
    document.getElementById("wind").innerHTML = windSpeed + ' ' + windDirection;
    document.getElementById("sunrise").innerHTML = sunRise;
    document.getElementById("sunset").innerHTML = sunSet;

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