function searchWeather() {
  const kota = document.getElementById("kota").value;
  getWeather(kota);
}

function getWeather(city) {
  const apiKey = "71dde681e090d4c7b8546ab91f810f59";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const weatherDetails = document.getElementById("detail-cuaca");
        const temperature = Math.round(response.main.temp - 273);
        const description = response.weather[0].description;
        weatherDetails.innerHTML = `<p>Temperatur: ${temperature}°C</p>
          <p>Deskripsi: ${description}</p>`;
        weatherDetails.style.display = "block";
      } else {
        console.error(
          `Gagal mendapatkan data cuaca untuk ${city}. Status:`,
          xhr.status
        );
      }
    }
  };

  xhr.onerror = function () {
    console.error("Terjadi kesalahan koneksi.");
  };

  xhr.open("GET", apiUrl, true);
  xhr.send();
}
