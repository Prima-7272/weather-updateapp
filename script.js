const apiKey = "b430000e22129909ba2a9bb2782aba9c";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const card = document.getElementById("weatherCard");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      card.classList.remove("hidden");

      card.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${icon}" />
        <h1>${data.main.temp}°C</h1>
        <p>${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
      `;
    } else {
      card.classList.remove("hidden");
      card.innerHTML = "City not found 😢";
    }
  } catch (err) {
    card.classList.remove("hidden");
    card.innerHTML = "Error loading data";
  }
}
navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  document.getElementById("weatherCard").classList.remove("hidden");

  document.getElementById("weatherCard").innerHTML = `
    <h2>${data.name} (Your Location)</h2>
    <h1>${data.main.temp}°C</h1>
    <p>${data.weather[0].description}</p>
  `;
});