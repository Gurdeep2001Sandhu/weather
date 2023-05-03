const inputBox = document.querySelector('.inputBox');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weatherImg');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weatherBody');

async function checkWeather(city){
    const api_key = "74546e48f7b7649ca3751253c4121d98";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    const weather_data = await fetch(`${url}`).then(
        response => response.json()
    );
    // console.log(weather_data);

    if (weather_data.cod === '404'){
        // console.log('error');

        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }

    weatherBody.style.display = "flex";

    temperature.innerHTML = `${weather_data.main.temp}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;

    windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Haze':
            weatherImg.src = "images/haze.png";
            break;
        case 'Clear':
            weatherImg.src = "images/clear.png";
            break;
        case 'Clouds':
            weatherImg.src = "images/cloud.png";
            break;
        case 'Mist':
            weatherImg.src = "images/mist.png";
            break;
        case 'Rain':
            weatherImg.src = "images/rain.png";
            break;
        case 'Snow':
            weatherImg.src = "images/snow.png";
            break;  
    }
}


searchBtn.addEventListener('click', function(){
    checkWeather(inputBox.value);
});

inputBox.addEventListener("keypress",function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});