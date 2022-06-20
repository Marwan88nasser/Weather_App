// loader window
let loaderContainer = document.querySelector(".loader");
window.addEventListener("load", () => {
  loaderContainer.classList.add("visible");
  setTimeout(() => {
    loaderContainer.remove();
  }, 3200);
});

// random images
let arrayOfImages = ["autumn.jpg", "spring.jpg", "summer.jpg", "winter.jpg"];
document.body.style.backgroundImage = "url('../images/autumn.jpg')";

setInterval(() => {
  // get random number
  let randomNumber = Math.floor(arrayOfImages.length * Math.random());
  // loop on every single img url
  for (let i = 0; i < 1; i++) {
    let imageEx = arrayOfImages[randomNumber];
    document.body.style.backgroundImage = `url("../images/${imageEx}")`;
  }
}, 4000);


// set the weather 
const Weather = {
  apiKey: "87296d1a2bdbc385861d05ed3fc133f8",
  fetchRequest: (city) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        Weather.apiKey
    )
      .then((responseInfo) => responseInfo.json())
      .then((getFinallyData) => {
        const weatherData = {
          name: getFinallyData.name,
          main: ({ humidity, temp } = getFinallyData.main),
          state: ({ description, icon } = getFinallyData.weather[0]),
          wind: ({ speed } = getFinallyData.wind),
        };
        return weatherData;
      })
      .then((data) => {
        const cityName = document.querySelector(".city");
        const temperature = document.querySelector(".temperature");
        const weatherImg = document.querySelector(".weather-img");
        const description = document.querySelector(".description");
        const humidityWeather = document.querySelector(".humidity");
        const windWeather = document.querySelector(".wind");
        // add data to view
        cityName.textContent = `Weather In ${data.name}`;
        temperature.textContent = Math.ceil(data.main.temp) + "°C";
        humidityWeather.textContent = `Humidity:  ${data.main.humidity}` + "%";
        weatherImg.src = `https://openweathermap.org/img/wn/${data.state.icon}@2x.png`;
        description.textContent = data.state.description;
        windWeather.textContent = `Wind Spead: ${data.wind.Speed}` + " km/h";
        document.querySelector(".weather-status").classList.remove("loading")
      });
  },
};

const searchFild = document.getElementById("search-inp");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () =>
  Weather.fetchRequest(searchFild.value)
);

searchFild.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    Weather.fetchRequest(searchFild.value);
  }
});

// conver language
const checkLanguage = document.getElementById("check-language");

checkLanguage.addEventListener("click", () => {
  document.querySelector(".language-contaienr").classList.toggle("choose");
  setTimeout(() => {
    window.location = "arabic.html";
  }, 400);
});

