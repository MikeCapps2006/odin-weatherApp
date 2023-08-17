const APIKEY = 'a79ea3ee64084a1e9fb15748212303';
const loc = document.querySelector('input');
const btnChangeLoc = document.getElementById('btnChangeLoc');
const currTemp = document.getElementById('currTemp');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feelsLike');
const windSpeed = document.getElementById('windSpeed');
const weatherDesc = document.getElementById('weatherDesc');
const locName = document.getElementById('location');
const day = document.getElementById('day');
const currentTime = document.getElementById('currentTime');
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const blurDiv = document.getElementById('blur');

async function getWeather () {
    const apiCall = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${loc.value}&aqi=no`);
    const locationData = await apiCall.json();
    populateApp(locationData);
}

function populateApp(weather){
    const date = new Date();
    weatherDesc.innerHTML = weather.current.condition.text;
    locName.innerHTML = weather.location.name;
    currTemp.innerHTML = weather.current.temp_f + '&deg; F';
    humidity.innerHTML = weather.current.humidity + '%';
    feelsLike.innerHTML = weather.current.feelslike_f + '&deg; F';
    windSpeed.innerHTML = weather.current.wind_mph + ' mph';
    day.innerHTML = weekday[date.getDay()];
    let mins = date.getMinutes();
    if (mins < 10){
        mins = '0' + mins;
    }
    if (date.getHours() > 11){
        currentTime.innerHTML = date.getHours() + ':' + mins + ' pm';
    } else {
        let hour = date.getHours();
        if(hour == 0) {
            hour = 12;
        }
        currentTime.innerHTML = hour + ':' + mins + ' am';
    }
    blurDiv.style.filter = 'blur(0)';
} 

btnChangeLoc.addEventListener('click', function(e) {
    e.preventDefault();
    getWeather(loc);
})

getWeather();