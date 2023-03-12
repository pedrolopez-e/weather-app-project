// url from which i will fetch data: https://api.openweathermap.org/data/2.5/weather?q=London&APPID=95a172af75b1f77ac85339db78d35e11 Donde dice london pongo el lugar que quiero

async function fetchLocationData(location) {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=95a172af75b1f77ac85339db78d35e11")
        if (!response.ok) {
            console.log("Location not found");
        }
        return response.json();
    } catch (error) {
        console.error(error.message);
    };
};

function processData(data) {

    let weather = data.weather[0].main;
    let description = data.weather[0].description;
    let temp = data.main.temp;
    let feelsLike = data.main.feels_like;
    let humidity = data.main.humidity;

    return { weather, description, temp, feelsLike, humidity };
};

async function getWeather(location) {
    let data = await fetchLocationData(location);
    let weatherObject = processData(data);
    console.log(processData(data));
    return weatherObject;

}

const submit = document.querySelector("#submit-button");
const input = document.querySelector("#location-input");

const temp = document.querySelector("h2");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const feelsLike = document.querySelector("#feels-like");



submit.addEventListener("click", async (event) => {
    event.preventDefault();
    let location = input.value;
    let weatherObject = await getWeather(location);
    console.log(weatherObject.weather);
    console.log(weatherObject.description);
    console.log(weatherObject.temp);
    console.log(weatherObject.feelsLike);
    console.log(weatherObject.humidity);
    temp.innerHTML = weatherObject.temp + "°F";
    description.innerHTML = (weatherObject.description).replace(/^\w/, c => c.toUpperCase());
    humidity.innerHTML = " " + weatherObject.humidity + "%";
    feelsLike.innerHTML = " " + weatherObject.feelsLike + "°F";
})

