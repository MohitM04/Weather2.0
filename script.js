const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '491cd2ebf2msh5de2b4775320646p127935jsn5796660cb760',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
}


const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".searchbtn");
const cloudImageElement = document.getElementById("cloudImage");
 
async function checkWeather(city) {
	document.querySelector(".cityname").innerHTML = city;
	const response = await fetch(url + city, options);
	if (response.status == 400) {
		alert("Please Enter Correct City Name");
	}
	else {
		const result = await response.json();
		console.log(result);
		document.querySelector(".temp label").innerHTML = result.temp + "°C";
		document.querySelector(".humidity .dta").innerHTML = result.humidity + "%";
		document.querySelector(" .wind .dta").innerHTML = result.wind_speed + "Km/h";

        if (result.cloud_pct>= 70) {
            if (result.temp >= 25) {
                cloudImageElement.src= "cloud.png"; // It's warm and cloudy
            } else if (result.temp< 25 && result.temp>= 15) {
                cloudImageElement.src= "cloudy.png"; // It's cool and cloudy
            } else {
                cloudImageElement.src= "overcast.png";; // It's cold and overcast
            }
          } else {
            if(result.temp>= 30) {
                cloudImageElement.src= "sun.png"; // It's hot and clear
            } else if (result.temp< 30 && result.temp>= 20) {
                cloudImageElement.src= "cloud.png"; // It's warm with scattered clouds
            } else {
                cloudImageElement.src= "rainy-day.png" // It's cold and rainy
            }
          }
        
	}


}
searchbtn.addEventListener("click", () => {
	checkWeather(searchbox.value);
})
window.addEventListener("load",()=>{
    checkWeather("Mumbai");
})

