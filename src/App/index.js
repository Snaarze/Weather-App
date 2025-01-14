import "./style.css";
import { format, isSameDay } from "date-fns";
const input = document.querySelector("input");
const button = document.querySelector("button");
const changeBtn = document.querySelector(".changeBtn");
const initialLocation = "Tokyo, Japan";
let isClicked = false;
let isCelcius = true;

button.addEventListener("click", displayWeatherConditions);
changeBtn.addEventListener("click", changeTemp);

function changeTemp(event) {
  if (isCelcius) {
    event.target.textContent = "C";
    runWeatherConditions(isClicked ? input.value : initialLocation);
    return (isCelcius = false);
  }

  event.target.textContent = "F";
  runWeatherConditions(isClicked ? input.value : initialLocation);
  return (isCelcius = true);
}

async function searchLocationWeather(value) {
  const weatherURL = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${value}/next7days?unitGroup=uk&include=events&key=XLGN3N998ZZ88M3G8EU3LGHEU&contentType=json`,
  );

  if (weatherURL.status === 200) {
    const response = await weatherURL.json();
    return response;
  }

  if (weatherURL.status === 429) {
    return console.log("Ooops Try again later..");
  }
  console.log(weatherURL.status);

  throw new Error(weatherURL.status);
}

function displayWeatherConditions() {
  runWeatherConditions(input.value);
  return (isClicked = true);
}

async function runWeatherConditions(value) {
  try {
    const response = await searchLocationWeather(value);
    displayWeather(response);
  } catch (err) {
    console.error(err);
    alert("No Location Found");
  }
}

function displayWeather(response) {
  // selectors
  const location = document.querySelector(".location");
  const temperature = document.querySelector(".temp");
  const feelsLike = document.querySelector(".feelsLike");
  const minTemp = document.querySelector(".minTemp");
  const maxTemp = document.querySelector(".maxTemp");
  const condition = document.querySelector(".conditionForecast");
  const description = document.querySelector(".description");
  const minFeels = document.querySelector(".minFeels");
  const maxFeels = document.querySelector(".maxFeels");
  const windSpeed = document.querySelector(".windSpeed");
  const windGust = document.querySelector(".windGust");
  const humidity = document.querySelector(".humidity");

  const dateNow = document.querySelector(".dateText");
  const secondDate = document.querySelector(".secondDate");
  const thirdDate = document.querySelector(".thirdDate");
  const fourthDate = document.querySelector(".fourthDate");
  const fifthDate = document.querySelector(".fifthDate");
  const sixthDate = document.querySelector(".sixthDate");
  const seventhDate = document.querySelector(".seventhDate");
  const eightDate = document.querySelector(".eightDate");

  location.textContent = response.resolvedAddress;
  temperature.textContent = convertTemp(response.days[0].temp);
  feelsLike.textContent = convertTemp(response.days[0].feelslike);
  minTemp.textContent = convertTemp(response.days[0].temp);
  maxTemp.textContent = convertTemp(response.days[0].temp);
  condition.textContent = response.days[0].conditions;
  description.textContent = response.days[0].description;
  minFeels.textContent = convertTemp(response.days[0].feelslikemin);
  maxFeels.textContent = convertTemp(response.days[0].feelslikemax);
  windSpeed.textContent = response.days[0].windspeed + "mph";
  windGust.textContent = response.days[0].windgust + "mph";
  humidity.textContent = response.days[0].humidity + "mph";

  //   selectors
  const dateTextPrecipitation = document.querySelector(
    ".dateTextPrecipitation",
  );
  const dateTextWind = document.querySelector(".dateTextWind");
  const dateTextTemp = document.querySelector(".dateTextTemp ");
  // first Day
  dateNow.textContent = convertDatesToDay(
    response.days[0].datetime,
    new Date(),
  );
  dateTextPrecipitation.textContent = response.days[0].precip + "%";
  dateTextWind.textContent = response.days[0].windspeed + "mph";
  dateTextTemp.textContent = convertTemp(response.days[0].temp);

  //   second day selectors
  //   selectors
  const secondTextPrecipitation = document.querySelector(
    ".secondDateTextPrecipitation",
  );
  const secondDateTextWind = document.querySelector(".secondDateTextWind");
  const secondDateTextTemp = document.querySelector(".secondDateTextTemp ");
  secondDate.textContent = convertDatesToDay(
    response.days[1].datetime,
    new Date(),
  );

  secondTextPrecipitation.textContent = response.days[1].precip + "%";
  secondDateTextWind.textContent = response.days[1].windspeed + "mph";
  secondDateTextTemp.textContent = convertTemp(response.days[1].temp);

  //   third selectors
  const thirdTextPrecipitation = document.querySelector(
    ".thirdDateTextPrecipitation",
  );
  const thirdDateTextWind = document.querySelector(".thirdDateTextWind");
  const thirdDateTextTemp = document.querySelector(".thirdDateTextTemp ");

  thirdTextPrecipitation.textContent = response.days[2].precip + "%";
  thirdDateTextWind.textContent = response.days[2].windspeed + "mph";
  thirdDateTextTemp.textContent = convertTemp(response.days[2].temp);
  thirdDate.textContent = convertDatesToDay(
    response.days[2].datetime,
    new Date(),
  );

  //   fourth
  const fourthTextPrecipitation = document.querySelector(
    ".fourthDateTextPrecipitation",
  );
  const fourthDateTextWind = document.querySelector(".fourthDateTextWind");
  const fourthDateTextTemp = document.querySelector(".fourthDateTextTemp ");

  fourthTextPrecipitation.textContent = response.days[3].precip + "%";
  fourthDateTextWind.textContent = response.days[3].windspeed + "mph";
  fourthDateTextTemp.textContent = convertTemp(response.days[3].temp);

  fourthDate.textContent = convertDatesToDay(
    response.days[3].datetime,
    new Date(),
  );

  // fourth selectors

  const fifthTextPrecipitation = document.querySelector(
    ".fifthDateTextPrecipitation",
  );
  const fifthDateTextWind = document.querySelector(".fifthDateTextWind");
  const fifthDateTextTemp = document.querySelector(".fifthDateTextTemp ");

  fifthTextPrecipitation.textContent = response.days[4].precip + "%";
  fifthDateTextWind.textContent = response.days[4].windspeed + "mph";
  fifthDateTextTemp.textContent = convertTemp(response.days[4].temp);

  fifthDate.textContent = convertDatesToDay(
    response.days[4].datetime,
    new Date(),
  );

  //   sixth date Selectors

  const sixthTextPrecipitation = document.querySelector(
    ".sixthDateTextPrecipitation",
  );
  const sixthDateTextWind = document.querySelector(".sixthDateTextWind");
  const sixthDateTextTemp = document.querySelector(".sixthDateTextTemp ");

  sixthTextPrecipitation.textContent = response.days[5].precip + "%";
  sixthDateTextWind.textContent = response.days[5].windspeed + "mph";
  sixthDateTextTemp.textContent = convertTemp(response.days[5].temp);
  sixthDate.textContent = convertDatesToDay(
    response.days[5].datetime,
    new Date(),
  );

  //   7th selectoors

  const seventhTextPrecipitation = document.querySelector(
    ".seventhDateTextPrecipitation",
  );
  const seventhDateTextWind = document.querySelector(".seventhDateTextWind");
  const seventhDateTextTemp = document.querySelector(".seventhDateTextTemp ");

  seventhTextPrecipitation.textContent = response.days[6].precip + "%";
  seventhDateTextWind.textContent = response.days[6].windspeed + "mph";
  seventhDateTextTemp.textContent = convertTemp(response.days[6].temp);
  seventhDate.textContent = convertDatesToDay(
    response.days[6].datetime,
    new Date(),
  );

  //   eight
  const eightTextPrecipitation = document.querySelector(
    ".eightDateTextPrecipitation",
  );
  const eightDateTextWind = document.querySelector(".eightDateTextWind");
  const eightDateTextTemp = document.querySelector(".eightDateTextTemp ");

  eightTextPrecipitation.textContent = response.days[7].precip + "%";
  eightDateTextWind.textContent = response.days[7].windspeed + "mph";
  eightDateTextTemp.textContent = convertTemp(response.days[7].temp);
  eightDate.textContent =
    "Next " + convertDatesToDay(response.days[7].datetime, new Date());
}

function convertTemp(temp) {
  if (isCelcius) {
    return Math.floor(temp) + "C";
  }

  return Math.floor((temp * 9) / 5 + 32) + "F";
}

function convertDatesToDay(currentDate, today) {
  if (isSameDay(currentDate, today)) {
    return "Today";
  }
  return format(new Date(currentDate), "EEEE");
}

runWeatherConditions(initialLocation);
