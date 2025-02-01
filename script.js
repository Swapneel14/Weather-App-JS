document.addEventListener("DOMContentLoaded", () => {
    const apikey = "00905f9532502c1bc95dc2871d1250f4";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchbox = document.querySelector(".search input");
    const searchbtn = document.querySelector(".search .search-btn");
    const weathericon=document.querySelector(".weather-icon");
    async function CheckWeather(city) {
        try {
            const response = await fetch(apiurl + city + `&appid=${apikey}`);
            const data = await response.json();

            if (data.cod === 200) { // Check if the city exists
                
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";
                if(data.weather[0].main=="Clouds"){
                    weathericon.src="clouds.png";
                }else if(data.weather[0].main=="Clear"){
                    weathericon.src="clear.png";
                }
                else if(data.weather[0].main=="Mist"){
                    weathericon.src="mist.png";
                }
                else if(data.weather[0].main=="Rain"){
                    weathericon.src="rain.png";
                }
                else if(data.weather[0].main=="Snow"){
                    weathericon.src="snow.png";
                }
                else if(data.weather[0].main=="Drizzle"){
                    weathericon.src="drizzle.png";
                }
                document.querySelector(".weather").style.display="block";

            } else {
                alert("City not found!");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("There was an error retrieving the weather data. Please try again.");
        }
    }

    searchbtn.addEventListener("click", () => {
        const city = searchbox.value.trim();
        if (city) {
            CheckWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    });
});
