// get the weather in arabic
const Weather = {
  apiKey: "87296d1a2bdbc385861d05ed3fc133f8",
  fetchRequest: (city) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        Weather.apiKey +
        "&lang=ar"
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
        cityName.style.margin = "20px 0px";
        cityName.textContent = `الطقس بمدينة ${data.name}`;
        temperature.textContent = Math.ceil(data.main.temp) + "°C";
        humidityWeather.textContent = `${data.main.humidity}% :الرطوبة`;
        weatherImg.src = `https://openweathermap.org/img/wn/${data.state.icon}@2x.png`;
        description.textContent = data.state.description;
        windWeather.textContent = `الرياح: ${data.wind.speed}` + " كم/ساعة";
        document.querySelector(".weather-status").classList.remove("loading");
      })
      .catch();
  },
};

const searchField = document.getElementById("search-inp");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () =>
  Weather.fetchRequest(searchField.value)
);

searchField.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    Weather.fetchRequest(searchField.value);
  }
});

// convert language
const checkLanguage = document.getElementById("check-language");

checkLanguage.addEventListener("click", () => {
  document.querySelector(".language-container").classList.toggle("choose");
  setTimeout(() => {
    window.location = "index.html";
  }, 400);
});
