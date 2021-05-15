const
    city =  document.querySelector('.city'),
    date = document.querySelector('.date'),
    time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    username = document.querySelector('.username'),
    search = document.querySelector('.search'),
    adds = document.querySelector('.weather-adds'),
    backbutton = document.querySelector('.backbutton'),
    langbutton = document.querySelector('.langbutton'),
    enbutton = document.getElementsByClassName('enbutton'),
    rubutton = document.getElementsByClassName('rubutton'),
    cbutton = document.getElementsByClassName('cbutton'),
    fbutton = document.getElementsByClassName('fbutton'),
    searchbutton = document.querySelector('.searchbutton'),
    weatherIcon = document.querySelector('.weather-icon'),
    qcbutton = document.querySelector('.cbutton'),
    qfbutton = document.querySelector('.fbutton'),
    qenbutton = document.querySelector('.enbutton'),
    qrubutton = document.querySelector('.rubutton'),
    temp = document.querySelector('.temp'),
    dayname = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthname = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", " December"],
    rusdayname = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    rusmonthname = ["января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря"],
    region = new Intl.DisplayNames(['en'], { type: 'region' }),
    rusregion = new Intl.DisplayNames(['ru'], { type: 'region' });


async function showDate() {
  let olddate = new Date,
  oldate = new Date(olddate.getUTCFullYear(), olddate.getUTCMonth(), olddate.getUTCDate(), olddate.getUTCHours(), olddate.getUTCMinutes(), olddate.getUTCSeconds()),
  newdate = new Date(oldate.valueOf() + timezone),
  day = newdate.getDay(),
  daynumber = newdate.getDate(),
  month = newdate.getMonth(),
  hour = newdate.getHours(),
  minute = newdate.getMinutes(),
  sec = newdate.getSeconds();
  time.innerHTML = `${hour}:${addZero(minute)}:${addZero(sec)}
  <br>`;
  if (localStorage.getItem('language') === 'EN')
    date.innerHTML = `${dayname[day]}, ${daynumber} ${monthname[month]}`
  else
    date.innerHTML = `${rusdayname[day]}, ${daynumber} ${rusmonthname[month]}`
  setTimeout(showDate, 1000);
}


function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


async function edBackground(){
    var back = (Math.floor(Math.random()*(13))).toString() + '.jpg';
    setBgGreet(back);
}

function setBgGreet(back) {
  let oldtoday = new Date,
  oltoday = new Date(oldtoday.getUTCFullYear(), oldtoday.getUTCMonth(), oldtoday.getUTCDate(), oldtoday.getUTCHours(), oldtoday.getUTCMinutes(), oldtoday.getUTCSeconds()),
  today = new Date(oltoday.valueOf() + timezone),
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
    console.log(url);
}

function setVisible(){
        if (enbutton[0].style.display == 'block'){
            enbutton[0].style.display = 'none';
            rubutton[0].style.display = 'none';
        }
        else{
        enbutton[0].style.display = 'block';
        rubutton[0].style.display = 'block';
        }
}

function setNoneVisible(){
    if (isEnter == 0){
        enbutton[0].style.display = 'none';
        rubutton[0].style.display = 'none';
    }
}

async function setLanguage(e){
    enbutton[0].style.display = 'none';
    rubutton[0].style.display = 'none';
    if (e.target.className == 'enbutton')
        localStorage.setItem('language', 'EN');
    else
    localStorage.setItem('language', 'RU');
    getLanguage();
    await getWeather();
    setCity();
    showDate();
}

function getLanguage(){
    if (localStorage.getItem('language') === 'EN'){
        langbutton.innerHTML = 'EN';
        search.placeholder = 'Search by city';
        feelslike = 'Feels like: ';
        wind = 'Wind: ';
        humidity = 'Humidity: ';
        speed = ' m/s';
    }
    else{
        langbutton.textContent = 'RU';
        search.placeholder = 'Поиск по городу';
        feelslike = 'Чувствуется как: ';
        wind = 'Ветер: ';
        humidity = 'Влажность: ';
        speed = ' м/с';
    } 
}

function setMeasure(e){
  if (e.target.className == 'cbutton')
      localStorage.setItem('measure', 'metric');
  else if (e.target.className == 'fbutton')
    localStorage.setItem('measure', 'imperial');
  getMeasure();
  getWeather();
}

function getMeasure(){
  if (localStorage.getItem('measure') === 'metric'){
    cbutton[0].style.background = 'black';
    fbutton[0].style.background = 'rgba(0,0,0,0.5)';
}
else{
    fbutton[0].style.background = 'black';
    cbutton[0].style.background = 'rgba(0,0,0,0.5)';
}
}

function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

async function getWeather(){
  let res;
    if ((town == null)||(town == ''))
      town = await getIP();
    res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${town}&lang=${localStorage.getItem('language')}&units=${localStorage.getItem('measure')}&APPID=9cb6cff3a8e7050935724619d2067534`);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.list[0].weather[0].id}`);
    temp.textContent = Math.round(data.list[0].main.temp)+'°';
    adds.innerHTML = ucFirst(data.list[0].weather[0].description) + '<br>' + feelslike + Math.round(data.list[0].main.feels_like) + '°<br>' + wind + 
    Math.round(data.list[0].wind.speed) + speed + '<br>' + humidity + data.list[0].main.humidity + '%';
    timezone = parseInt(data.city.timezone)*1000;
    enrustown = data.city.name;
    country = data.city.country;
}

async function getIP(){
    const res = await fetch(`https://ipinfo.io/json?token=15fab0157d6dad`);
    const data = await res.json();
    town = data.city;
    return town;
}

function hover(e){
  if (e.target.className == 'cbutton'){
    if (localStorage.getItem('measure') != 'metric')
    {
      if (e.type == 'mouseenter')
        cbutton[0].style.background = 'rgba(0,0,0,0.7)';
      else
      cbutton[0].style.background = 'rgba(0,0,0,0.5)';
    }
  }
  else{
    if (localStorage.getItem('measure') === 'metric')
    {
      if (e.type == 'mouseenter')
        fbutton[0].style.background = 'rgba(0,0,0,0.7)';
      else
        fbutton[0].style.background = 'rgba(0,0,0,0.5)';
    }
  }
}

async function setTown(e){
    if (e.which == 13 || e.keyCode == 13 || e.type == 'click') {
      town = search.value;
      search.blur();
      await getWeather();
      setCity();
      edBackground();
    }
}

function setCity(){
  if (localStorage.getItem('language') == 'EN'){
    city.textContent = enrustown+', '+region.of(country);
  }
  else{
    city.textContent = enrustown+', '+rusregion.of(country);
  }
}

function getStartMeasure(){
  if ((localStorage.getItem('language') == null))
    localStorage.setItem('language', 'EN');
  if ((localStorage.getItem('measure') == null))
    localStorage.setItem('measure', 'metric');
}

async function start(){
  await getStartMeasure();
  await getLanguage();
  await getWeather();
  await edBackground();
  setCity();
  getMeasure();
  showDate();
}

var town,
rustown,
country,
feelslike,
wind,
humidity,
speed;
var isEnter = 0;
var timezone;
backbutton.addEventListener('click', edBackground);
langbutton.addEventListener('click', setVisible);
qenbutton.addEventListener('mouseenter',  (() => { isEnter = 1}))
qrubutton.addEventListener('mouseenter', (() => { isEnter = 1}))
qenbutton.addEventListener('mouseleave', (() => { isEnter = 0}))
qrubutton.addEventListener('mouseleave', (() => { isEnter = 0}))
qenbutton.addEventListener('click', setLanguage);
qrubutton.addEventListener('click', setLanguage);
qcbutton.addEventListener('click', setMeasure);
qfbutton.addEventListener('click', setMeasure);
qcbutton.addEventListener('mouseenter',  hover);
qfbutton.addEventListener('mouseenter', hover);
qcbutton.addEventListener('mouseleave', hover);
qfbutton.addEventListener('mouseleave', hover);
langbutton.addEventListener('blur', setNoneVisible);
search.addEventListener('keypress', setTown);
searchbutton.addEventListener('click', setTown);

document.body.style.backgroundImage = "url('back.jpg')";
start();