import { useState } from "react";
import "./Weather.scss";

const Weather = () => {
  let today = new Date();
  let data =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [dateToday, setDateToday] = useState(data);

  const api = {
    url: "http://api.openweathermap.org/data/2.5/",
    key: "ef9dd1e4225d57c407c08d2155cf1622",
  };
  const iconURL = "http://openweathermap.org/img/w/";
  const getInput = (e) => {
    setInput(e.target.value);
  };

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be empty");
      setError(true);
    }
    if (e.key === "Enter" && input !== "") {
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to Fetch Data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
          setIsLoading(false);
        });
    }
  };
  return (
    <section className="--100vh --center-all">
      <div className="container weather --flex-center">
        <div className="weather-app --text-light">
          <h1>Weather App</h1>
          <p>{dateToday}</p>
          <div className="--form-control --my2">
            <input
              type="text"
              placeholder="Seacah city name"
              onChange={getInput}
              value={input}
              onKeyPress={getWeatherData}
            />
          </div>
          {error ? (
            <p className={errorMsg != "" ? "error" : ""}>{errorMsg}</p>
          ) : (
            <div className="result --card --my2">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconURL + weather.weather[0].icon + ".png"}
                  alt="Clouds"
                />
              </div>
              <p>Temp:{Math.round(weather.main.temp)}℃</p>
              <p>Weather: {weather.weather[0].main}</p>
              <p>
                Temp Range: {Math.round(weather.main.temp_min)}℃ /{" "}
                {Math.round(weather.main.temp_max)}℃
              </p>
            </div>
          )}
        </div>

        {isLoading && <h3>Loading ...</h3>}
      </div>
    </section>
  );
};

export default Weather;
