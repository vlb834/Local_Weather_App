// GEOLOCATION CODE RESOURCES: 
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
// https://www.sitepoint.com/html5-geolocation/ - Code from this site.
// http://youmightnotneedjquery.com/ 
// EPOCH TIME CONVERTER :
// https://www.epochconverter.com/programming/#javascript
// CREDITS:
// windDegtoCardinalDirection courtesy of Pascal's code here: https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words#7490772


// GLOBAL VARIABLES //
let tempUnit = "&#176C";
let temp = 0;

function toggleTempUnit() {
    if (tempUnit === "&#176C") {
        tempUnit = "&#176F";
        temp = Math.round((temp * 9 / 5) + 32);
        return document.getElementById("temperature").innerHTML = temp + tempUnit;
    } else if (tempUnit === "&#176F") {
        tempUnit = "&#176C";
        temp = Math.round((temp - 32) * 5 / 9);
        return document.getElementById("temperature").innerHTML = temp + tempUnit;
    }
}

function detailedWeatherDescription(weather) {
    if (weather.length > 1) {
        let descriptions = weather.map(x => x['description']);
        let weatherLocal = 'Mix of ';
        for (let x of descriptions) {
            weatherLocal = weatherLocal.concat(x + ', ');
        }
        return weatherLocal = weatherLocal.slice(0, weatherLocal.length - 2) + '.';
    } else {
        console.log(weather[0]['description']);
        weatherLocal = weather[0]['description'];
        weatherLocal = weatherLocal.charAt(0).toUpperCase() + weather.slice(1);
        return weatherLocal;
    }
}

function windDegtoCardinalDirection(degrees) {
    //Code via stackoverload - see resources and credits above
    while (degrees < 0) degrees += 360;
    while (degrees >= 360) degrees -= 360;
    let val = Math.round((degrees - 11.25) / 22.5);
    let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[Math.abs(val)];
}

function daylight(sunData) {
    console.log(sunData);
    let time = new Date(sunData * 1000);
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

//const TempColors = [purple, indigo, darkblue, blue, cornflowerblue, lightblue, yellow, orange, darkorange, orangered, red, darkred];
//const WeatherColors = {Fog: grey, Mist: grey, Drizzle: grey, Rain: blue, Snow: white};
//function assignColors() {
//}

function defineWeatherVariables(weatherData) {
    geolocation = weatherData['name'];
    temp = Math.round(weatherData['main']['temp']);
    detailedDescription = detailedWeatherDescription(weatherData['weather']);
    humidity = 'Humidity: ' + weatherData['main']['humidity'] + '&#37';
    pressure = 'Pressure: ' + Math.round(weatherData['main']['pressure']) + ' hPa';
    windSpeed = 'Wind: ' + weatherData['wind']['speed'] + 'km/hr';
    windDirection = windDegtoCardinalDirection(weatherData['wind']['deg']);
    sunRise = daylight(weatherData['sys']['sunrise']);
    sunSet = daylight(weatherData['sys']['sunset']);
    colorTemp = 'blue';
    colorWeather = 'grey';
    // assignColors();
    gradient = 'linear-gradient(45deg, ' + colorTemp + ', ' + colorWeather + ')';
}

function displayIcons(weather) {
    if (weather.length > 1) {
        let icons = weather.map(x => x['icon']);
        for (let x of icons) {
            if (x !== undefined) {
                let img = new Image();
                img.src = "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F" + [x] + ".png?1499366021399";
                document.getElementById("icon").appendChild(img);
            }
        } 
    } else {
        let img = new Image();
        img.src = weather[0]['icon']; // check this works!!! 
        document.getElementById("icon").appendChild(img);
    }
}    

    function displayCurrentWeather(weatherData) {
        defineWeatherVariables(weatherData);
        displayIcons(weatherData['weather']); // possible multiple icons for variable weather addressed by function
        document.getElementById("location").innerHTML = geolocation;
        document.getElementById("temperature").innerHTML = temp + tempUnit;
        document.getElementById("description").innerHTML = detailedDescription;
        document.getElementById("humidity").innerHTML = humidity;
        document.getElementById("pressure").innerHTML = pressure;
        document.getElementById("wind").innerHTML = windSpeed + ' ' + windDirection;
        document.getElementById("sunrise").innerHTML = sunRise;
        document.getElementById("sunset").innerHTML = sunSet;
        document.getElementById("details").style.display = 'block';
        document.getElementById("toggleTemp").style.display = 'block';
        // document.getElementByItoggleTemppaper").style["background-image"] = 'linear-gradient(45deg, green, yellow)';
        document.getElementById("wallpaper").style["background-image"] = gradient;
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

    window.onload = function () {
        document.getElementById("toggleTemp").addEventListener("click", toggleTempUnit, false);
    }