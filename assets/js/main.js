const btnSearch = document.querySelector('.btn-search');
const Place = document.getElementById('place');
const Location = document.getElementById('location');
const temperature = document.getElementById('temperature');
const windSpeedValue = document.getElementById('windSpeedValue');
const windDegreeValue = document.getElementById('windSpeedDegree');
const humidity = document.getElementById('humidity');
const weatherCondition = document.getElementById('current-weather-conditions');
const Visibility = document.getElementById('visibility');
const pressure = document.getElementById('pressure');
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiID = "02a2299960b7ffe33188503fbe432882";
const imgsect = document.querySelector('.graph');
var isCelcius = true;
const btnSection = document.querySelector('.btn-section');
let temp;
var cityLat = 37.78;
var cityLon = -122.42;

btnSearch.addEventListener('click', (e) => {
  var regInteger = /^-?\d+$/;
  e.preventDefault();
  if (Location.value == '') {
    displayAlert("Please input a place of interest");
    console.log('cant be empty')
  } else if (regInteger.test(Location.value)) {
    displayAlert("You can't input a number");
  } else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Location.value}&APPID=02a2299960b7ffe33188503fbe432882`).then(res => res.json()).then((data) => {
      cityLat = data.coord.lat;
      cityLon = data.coord.lon;
      temperature.innerText = `${data.main.temp}`;
      Place.innerText = `${data.name}`;
      windSpeedValue.innerText = data.wind.speed;
      windDegreeValue.innerText = `${data.wind.deg}°`;
      humidity.innerText = data.main.humidity;
      weatherCondition.innerText = data.weather[0].main;
      pressure.innerText = data.main.pressure;
      img(data.weather[0].main);
      if (data.visibility) {
        Visibility.innerText = data.visibility;
      } else {
        Visibility.innerText = `none`;
      }

      Location.value = '';
      initMap()
    }).catch(err => {
      displayAlert('Place Not Found Kindly Carry Out a spell Check');
    })
  }
})

function displayAlert(message, num) {
  Location.value = '';
  const alert = document.querySelector('.alert');
  const msg = document.querySelector('.alert-message');
  switch (num) {
    case 1:
      alert.classList.add('');
      break;

    default:
      alert.classList.add('alert-danger');
      alert.style.display = 'block';
      msg.innerText = message;
      setTimeout(() => {
        alert.style.display = 'none';
      }, 100);
      break;
  }
}

function img(data) {
  // const img = document.querySelector('.detail-img');
  const img = document.createElement('img');
  imgsect.appendChild(img);
  switch (data) {
    case "Clouds":
      img.src = 'assets/img/cloudy.png';

      break;
    case "Rainy":
      img.src = 'assets/img/rain.png';

      break;
    case "Clear":
      img.src = 'assets/img/sunny.png';

      break;
    case "Drizzle":
      img.src = 'assets/img/rain.png';

      break;
    default:
      img.src = '';
      break;
  }
}


function cToF(celsius) {
  return temperature.innerText = celsius;
}

function fToC(fahrenheit) {
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  return temperature.innerText = fToCel.toFixed(2);
}

function getDefaultData(params) {
  fetch(`${url}lagos&APPID=${apiID}`)
    .then(res => res.json()).then((data) => {
      console.log(data);
      temp = data.main.temp;
      Place.innerText = `${data.name}`;
      windSpeedValue.innerText = data.wind.speed;
      if (data.wind.deg) {
        windDegreeValue.innerText = `${data.wind.deg}°`;
      } else {
        windDegreeValue.innerText = `0°`;
      }
      humidity.innerText = data.main.humidity;
      weatherCondition.innerText = data.weather[0].main;
      pressure.innerText = data.main.pressure;
      img(data.weather[0].main);
      if (data.visibility) {
        Visibility.innerText = data.visibility;
      } else {
        Visibility.innerText = `none`;
      }
      temperature.innerText = temp;
      const btnC = document.createElement('button');
      const btnF = document.createElement('button');
      btnC.classList.add('temp');
      btnF.classList.add('temp');
      btnC.innerText = '°C';
      btnF.innerText = '°F';
      btnSection.append(btnC);
      btnSection.append(btnF);
      btnC.setAttribute('onclick', `cToF(${data.main.temp})`);
      btnF.setAttribute('onclick', `fToC(${data.main.temp})`);
      cityLat = data.coord.lat;
      cityLon = data.coord.lon;
      initMap();
    })
}
// Initialize and add the map
function initMap() {
  // The location of Place
  var place = {
    lat: cityLat,
    lng: cityLon
  };
  // The map, centered at place
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 19,
      center: place
    });
  // The marker, positioned at place
  var marker = new google.maps.Marker({
    position: place,
    map: map
  });

}

// google.maps.event.addDomListener(window, 'load', initMap);
// window.addEventListener('load', initMap)

window.addEventListener('load', getDefaultData)