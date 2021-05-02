const weather = document.querySelector(".js-geolocation");
const COORDS = 'coords';
const API_KEY = `745816cad545106739b9b762086c193e`;


function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function (response){
        return response.json();
    }).then(function (jsoned) {
        const temperature = jsoned.main.temp;
        const place = jsoned.name;
        weather.innerText = `나는 지금 ${place} 에 있고 밖의 온도는 ${temperature}도이다.`;
    });
}









function saveCoords(userLocation) {
    localStorage.setItem(COORDS, JSON.stringify(userLocation));

}



function handleGeoSuccess(position) {
const lat = position.coords.latitude;
const lng = position.coords.longitude;
const userLocation = {
    lat,lng
    
};

saveCoords(userLocation);
getWeather(userLocation.lat, userLocation.lng);

}



function handleGeoError() {
    console.log("cant access geo location");
}




function askForCoords () {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    console.log(navigator);
   

}



function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.lat, parsedCoords.lng);


    }


}


function init () {
    loadCoords()


}

init ();