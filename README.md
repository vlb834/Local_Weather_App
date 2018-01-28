# Local_Weather_App
FreeCodeCamp Project

Not responsive or mobile-friendly. Best viewed in a desktop/laptop browser - only tested in Chrome. 

#### JSON API

Uses FreeCodeCamps weather API found below: 
https://fcc-weather-api.glitch.me/

Unfortunatley the API is not without it's idiosyncracies, resulting in extra code to deal with edge cases such as multiple types of weather and missing weather icons. 

The API also randomly does not respond or redirects to a default location - Shuzenji, Japan - resulting in 404 Icon Not Found errors. Not sure how to fix this yet. 

#### SUNRISE / SUNSET TIME AND TIME ZONES

Currently time displays according the user's local timezone, even when clicking through the different cities around the world. The sun times are correct, but show what time in the user's timezone, the sun will be rising/setting in a different timezone. 

If I had more time, I would have liked to address this issue, and display the time according the local time zone of the weather location beind displays. Unfortunately, this seemed like a rabbit-hole best left for another time! 

Some resources to explore to achieve this: 
https://github.com/darkskyapp/tz-lookup/





