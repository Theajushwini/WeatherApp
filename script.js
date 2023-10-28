weather = {
  apiKey: "b2051d72669d5a93a8622a572cdff8d2",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  // Your existing code...

// Modify the displayWeather function
displayWeather: function (data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";

  // Retrieve the existing suggestions div
  const suggestionDiv = document.querySelector(".suggestions");

  // Clear previous suggestions
  suggestionDiv.innerHTML = "";

  // Add suggestions based on weather conditions and temperature
  if (description.includes("rain")) {
    suggestionDiv.innerHTML += "<p>Don't forget your umbrella!</p>";
  } else if (description.includes("sun")) {
    suggestionDiv.innerHTML += "<p>Bring a cap to protect from the sun.</p>";
  } else if (temp < 10) {
    suggestionDiv.innerHTML += "<p>It's cold. Grab a jacket.</p>";
  } else if (temp >= 10 && temp < 20) {
    suggestionDiv.innerHTML += "<p>A light jacket might be a good idea.</p>";
  } else if (temp >= 20 && temp < 30) {
    suggestionDiv.innerHTML += "<p>Enjoy the pleasant weather!</p>";
  } else if (temp >= 30) {
    suggestionDiv.innerHTML += "<p>Stay hydrated in the hot weather.</p>";
  }
},

// Your existing code...

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Chennai");
