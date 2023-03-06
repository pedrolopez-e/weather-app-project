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
    console.log(processData(data));
}

getWeather("Buenos Aires");

