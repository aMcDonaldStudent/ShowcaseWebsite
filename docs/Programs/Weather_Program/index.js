// Weather App
//       My weather app API key: c7506ebc2f3e48db96a203322250607
// using different weather website because previous one was deprecated.

//can't get element by id bc we are working with classes so:
//we use query selector
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "c7506ebc2f3e48db96a203322250607";

let cooldown = false;
weatherForm.addEventListener("submit", async event => {
    /*   //disabled cooldown mode
    if (cooldown) return;

    cooldown = true;
    setTimeout(() => cooldown = false, 5000); //cooldown for 5 seconds.
    
    if (!rL()) return;
    */
    event.preventDefault(); 
    //this prevents the forms default behavior where it refreshes the page
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            //we go back and put "async" in front of our arrow function
            //we have to wait for this function to return the weather data
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }

});
/*
function rL() {
    const k = "_🌡️"; 
    const today = new Date().toDateString();
    let data;

    try {
        data = JSON.parse(localStorage.getItem(k)) || {};
    } catch {
        data = {};
    }

    if (data.date !== today) {
        data = { date: today, count: 0 };
    }

    if (data.count >= 10) {
        displayError("Daily limit for API calls reached.");
        return false;
    }

    data.count++;
    localStorage.setItem(k, JSON.stringify(data));
    return true;
}
*/ //Disabled localstorage limit
async function getWeatherData(city){
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
    
    //we found this at https://openweathermap.org/current#name for an API call by city name
    //at this point I have to put in billing information and calling more than 1000 times bills me for .0015 usd per day

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Weather data fetch failed");
    }

    const data = await response.json();
    console.log("Parsed weather data:", data);
    return data;
}

function displayWeatherInfo(data) {
    card.textContent = ""; 
    card.style.display = "flex";

    const updated = document.createElement("p");
    updated.textContent = `Last updated: ${data.current.last_updated}`;

    const location = document.createElement("h2");
    location.textContent = `${data.location.name}, ${data.location.region}`;
    location.classList.add("cityDisplay");

    const tempf = document.createElement("p");
    tempf.textContent = `${data.current.temp_f}°F`;
    tempf.classList.add("tempDisplay");

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    humidity.classList.add("humidityDisplay");

    const condition = document.createElement("p");
    condition.textContent = ` ${data.current.condition.text}`;
    condition.classList.add("descDisplay");

    const icon = document.createElement("img");
    icon.src = `https:${data.current.condition.icon}`;
    

    card.appendChild(updated);
    card.appendChild(location);
    card.appendChild(tempf);
    card.appendChild(humidity);
    card.appendChild(condition);
    card.appendChild(icon);
}


function getWeatherEmoji(weatherId){

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}