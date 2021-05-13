const
    date = document.querySelector('.date'),
    time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    username = document.querySelector('.username'),
    focusname = document.querySelector('.focus'),
    backbutton = document.querySelector('.backbutton'),
    quotebutton = document.querySelector('.quotebutton'),
    quote = document.querySelector('.quote'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    townname = document.querySelector('.town'),
    dayname = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    monthname = ["января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря"];


function showDate() {
  let newdate = new Date(),
  day = newdate.getDay(),
  daynumber = newdate.getDate(),
  month = newdate.getMonth(),
  hour = newdate.getHours(),
  minute = newdate.getMinutes(),
  sec = newdate.getSeconds();
  time.innerHTML = `${hour}:${addZero(minute)}:${addZero(sec)}
  <br>`;
  date.innerHTML = `${dayname[day]}, ${daynumber} ${monthname[month]}`
  setTimeout(showDate, 1000);
}


function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}




function setWeather(e) {
    if (e.type === 'keypress' && e.target.innerText != '') {
        if (e.which == 13 || e.keyCode == 13) {
          localStorage.setItem('town', e.target.innerText);
          townname.blur();
          getWeather();
        }
      } else if  (e.target.innerText != ''){
        localStorage.setItem('town', e.target.innerText);
        getWeather();
      }
    
      if (e.type === 'click')
      {
        townname.textContent = '';
      }
    
      else if (e.target.innerText == ''){
        if (e.which == 13 || e.keyCode == 13){
          townname.blur();
        }
        if (e.type === 'blur'){
            getWeather();
        }
      }
}


async function getWeather() {  
  var town = '';
  if (localStorage.getItem('town') === null) {
    townname.textContent = '[Введите Ваш город]';
  } 
  else {
    townname.textContent = localStorage.getItem('town');
    town = localStorage.getItem('town');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=ru&appid=9cb6cff3a8e7050935724619d2067534&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod == '404')
    {
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = 'Введите верный город';
      weatherDescription.textContent = '';
    }
    else{
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDescription.textContent = `Скорость ветра: ${data.wind.speed}м/с\nВлажность: ${data.main.humidity} %`;
    }
  }
}

async function edBackground(){
    await new Promise(r => setTimeout(r, 1));
    var back = (Math.floor(Math.random()*(13))).toString() + '.jpg';
    setBgGreet(back);
}

function setBgGreet(back) {
  let today = new Date(),
    hour = today.getHours(),
    month = today.getMonth(),
    url = "url(";

    if ((month < 2) || (month == 11))
        url = url + "'/winter/"
    else if (month < 5)
        url = url + "'/spring/"
    else if (month < 8)
        url = url + "'/summer/"
    else
        url = url + "'/autumn/"

    if (hour < 6)
        url = url + "night/"

  
    else if (hour < 12) 
        url = url + "morning/"

    else if (hour < 18) 
    url = url + "afternoon/"

    else
    url = url + "evening/"
    url = url + back + "')";
    document.body.style.backgroundImage = url;
    console.log(url)
}

townname.addEventListener('keypress', setWeather);
townname.addEventListener('click', setWeather);
townname.addEventListener('blur', setWeather);
backbutton.addEventListener('click', edBackground);
document.body.style.backgroundImage = "url('back.jpg')";
showDate();
getWeather();
edBackground();