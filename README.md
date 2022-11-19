# damp-detector

Don't be a drip; skip the precip!

A Simple Weather App to practice API calls and async/await/promises

How to use:

It's pretty simple, really. Just tap/click the change location button and enter a city, state, or country and the app will display
current conditions as well as a seven day foreast. The app retrieves this information from the openweathermap API. The app uses
local storage to store your most recent location and preferred temperature scale, so those will persist through browser refreshes
or if you navigate away from the page and return.

Upcoming features/things I'd like to fix or change:

1. add error handling. Currently, invalid location input only throws an error in the console. I need to add js form validation to
   the input element (or at least display a visible error message if the get request fails)
2. improve layout responsivity. This app is much closer to a fully responsive design than Drudgery Assistant (it helps that I
   designed the mobile layout first), but there are still a fair number of fiddly inconsistencies I need to iron out (e.g. the forecast
   container size shouldn't change when the temperature scale is toggled)
3. improve color palette. Some of the icons/text contrast poorly with certain background images
   - changing the color/opacity of the container backgrounds is probably the best fix here

New things I have learned while building this project:

1. how to incorporate promises into asynchronous code
2. how to request data from API endpoints
3. how to use JS media queries to render background images formatted for mobile/desktop
4. how to use the transform/transition properties for simple animations
5. more practice creating responsive designs and using image breakpoint generators
6. more practice using the local/session storage API
