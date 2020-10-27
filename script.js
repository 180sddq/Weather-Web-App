//api access key
alert("Make sure you input a valid ZIP-code or City Name or else it won't work!");
var appId = 'bdff9a5531280648e721c7a1c94643be';
//units that we want temperature in
//imperial is US system temperature
var units = 'imperial';
//initialize variable but no need to set to anything because the function getSearchMethod will do it for us
var cityOrZip = 'zip';

//checks to see whether we entered a zip or a city and changes the method of searching accordingly
function getSearchMethod(searchString){
    //Number.parseInt(searchTerm) changes input to number and sees if only numbers were added, then changes it back to a string(+'') for comparison
    // example 123apple would be converted to 123 and the argument 123===123apple would be false
    if(searchString.length === 5 && Number.parseInt(searchString)+'' === searchString){
        cityOrZip = 'zip';
    } else{
        //q stands for city in url
        cityOrZip = 'q'
    }
}
// looks for the weather information for the zip or city inputted
function searchWeather(searchString){
    //to inject javascript into the string//& is going to separate each query parameter
    //check to see if input is zip or city so that it can be inputted correctly in the url
    getSearchMethod(searchString);
    //sending the http request to the server I guess and THEN the method returns the json format of the api and THEN the method prints it to the console
    // the ` next to the 1 key helps to inject javascript into the string//& is going to separate each query parameter
    //fetch maans -> get the api information THEN do something with this data//gets info from the server then arrives back to you
    fetch(`http://api.openweathermap.org/data/2.5/weather?${cityOrZip}=${searchString}&APPID=${appId}&units=${units}`)
    .then(result => {  
        //to inject javascript into the string//& is going to separate each query parameter
        //change the result to json format
        return result.json();
    })
    .then(result => {
        init(result);
    })
      //coverts http request to json to which we can work with
        //call to api then returns json, result is info from server
}
//outputs the json format to the console.
function init(resultFromServer){
    //console.log(resultFromServer);
    switch(resultFromServer.weather[0].main){
        case 'Clear':
            //can fix image size in css
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rainy.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("thunderstorm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
        default:
            document.body.style.backgroundImage = 'url("all.jpg")';
            break;
    }

    //could be var
    var weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    var temperatureElement = document.getElementById('temperature');
    var humidityElement = document.getElementById('humidity');
    var windSpeedElement = document.getElementById('windSpeed');
    var cityHeader = document.getElementById('cityHeader');
    var weatherIcon = document.getElementById('documentIconImg');
    var resultDescription = resultFromServer.weather[0].description;

    weatherIcon.src = 'http://openweathermap.org/img/wn/'+resultFromServer.weather[0].icon +'.png';
    //we are taking each thing from the json and putting it into the html
    //uppercase the first letter then attaching the lowercase letters
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%'

    setPositionforWeatherInfo();
}
function setPositionforWeatherInfo() {
    //connectin the weather container tag in html with the variable weatherContainer
    let weatherContainer = document.getElementById('weatherContainer');
    //getting the total height(border+margin+padding) adn width (border+margin+padding)of the container
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;
    
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility ='visible';
}

//putting it all together
// why does it have to be document?(probably becuz we are getting text(api)) I guess it is just built in and its talking about the html document and thats where we get the element id of the button
// where we 'listen' for a click(which is one type of listening 'shrugs') and then the a function passed in.
//id connects the javascript and html
document.getElementById('searchButton').addEventListener('click', () => {
    //stores the zip or city into the searchTern variable
    //id connects the javascript and html
    var searchString = document.getElementById('searchInput').value;
    //I don't the need of this if statement since there will always be an input for a searchTerm(the guy says we put this to see if searchTerm
    //exist) but even when I put the word 'wha' it still passes the argument through the searchWeather function and eventually ends up giving an
    //error. 
    if(searchString){
        searchWeather(searchString)
    }
})
