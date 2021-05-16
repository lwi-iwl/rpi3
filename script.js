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
    kbutton = document.getElementsByClassName('kfbutton'),
    searchbutton = document.querySelector('.searchbutton'),
    voicebutton = document.querySelector('.voicebutton'),
    vbutton = document.getElementsByClassName('voicebutton'),
    ltlg = document.querySelector('.ltlg'),
    weatherIcon = document.querySelector('.weather-icon'),
    follow = document.querySelectorAll('.follow'),
    followicon = document.querySelectorAll('.follow-icon'),
    followdate = document.querySelectorAll('.followdate'),
    qcbutton = document.querySelector('.cbutton'),
    qfbutton = document.querySelector('.fbutton'),
    qkbutton = document.querySelector('.kfbutton'),
    qenbutton = document.querySelector('.enbutton'),
    qrubutton = document.querySelector('.rubutton'),
    map = document.querySelector('.map'),
    temp = document.querySelector('.temp'),
    dayname = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    fulldayname = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", " Saturday"],
    monthname = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", " December"],
    rusdayname = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    fullrusdayname = ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
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
  {
    date.innerHTML = `${dayname[day]}, ${daynumber} ${monthname[month]}`
    followdate[0].textContent = fulldayname[(day+1)%7];
    followdate[1].textContent = fulldayname[(day+2)%7];
    followdate[2].textContent = fulldayname[(day+3)%7];
  }
  else
  {
    date.innerHTML = `${rusdayname[day]}, ${daynumber} ${rusmonthname[month]}`
    followdate[0].textContent = fullrusdayname[(day+1)%7];
    followdate[1].textContent = fullrusdayname[(day+2)%7];
    followdate[2].textContent = fullrusdayname[(day+3)%7];
  }
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
    await getCoordinates();
    if ((search.placeholder == 'Введите корректный город') || (search.placeholder == 'Enter the correct city'))
      await getWeather(1);
    else
      await getWeather(0);
    setCity();
    showDate();
}

function getLanguage(){
    if (localStorage.getItem('language') === 'EN'){
        langbutton.innerHTML = 'EN';
        if ((search.placeholder == 'Введите корректный город') || (search.placeholder == 'Enter the correct city'))
          search.placeholder = 'Enter the correct city'
        else
        {
          search.placeholder = 'Search by city';
        }
        feelslike = 'Feels like: ';
        wind = 'Wind: ';
        humidity = 'Humidity: ';
        speed = ' m/s';
        latitude = 'Latitude: ';
        longitude = 'Longitude: ';
    }
    else{
        langbutton.textContent = 'RU';
        if ((search.placeholder == 'Введите корректный город') || (search.placeholder == 'Enter the correct city')){
         alert('sdsd');
          search.placeholder = 'Введите корректный город'
        }
        else
          search.placeholder = 'Поиск по городу';
        feelslike = 'Чувствуется как: ';
        wind = 'Ветер: ';
        humidity = 'Влажность: ';
        speed = ' м/с';
        latitude = 'Широта: ';
        longitude = 'Долгота: '
    } 
}

function setMeasure(e){
  if (e.target.className == 'cbutton')
      localStorage.setItem('measure', 'metric');
  else if (e.target.className == 'fbutton')
    localStorage.setItem('measure', 'imperial');
  else if (e.target.className == 'kfbutton')
  localStorage.setItem('measure', 'standart');
  getMeasure();
  getWeather(0);
}

function getMeasure(){
  if (localStorage.getItem('measure') === 'metric'){
    cbutton[0].style.background = 'black';
    fbutton[0].style.background = 'rgba(0,0,0,0.5)';
    kbutton[0].style.background = 'rgba(0,0,0,0.5)';
}
else if (localStorage.getItem('measure') === 'imperial'){
    fbutton[0].style.background = 'black';
    cbutton[0].style.background = 'rgba(0,0,0,0.5)';
    kbutton[0].style.background = 'rgba(0,0,0,0.5)';
}
else{
  fbutton[0].style.background = 'rgba(0,0,0,0.5)';
  cbutton[0].style.background = 'rgba(0,0,0,0.5)';
  kbutton[0].style.background = 'black';
}
}

function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

async function getWeather(a){
  let res;
    if ((town == null)||(town == ''))
      town = await getIP();
    res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${town}&lang=${localStorage.getItem('language')}&units=${localStorage.getItem('measure')}&APPID=9cb6cff3a8e7050935724619d2067534`);
    const data = await res.json();
    if (data.cod == '404')
    {
      if (localStorage.getItem('language') === 'EN')
        search.placeholder = 'Enter the correct city';
      else
      search.placeholder = 'Введите корректный город';
      search.value = '';
      town = oldtown;
      getWeather(1);
      return 1;
    }
    else
    {
      if (a == 0)
      if (localStorage.getItem('language') === 'EN')
        search.placeholder = 'Search by city';
      else
        search.placeholder = 'Поиск по городу';
      oldtown = town;
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.list[0].weather[0].id}`);
      followicon[0].className = 'follow-icon owf';
      followicon[0].classList.add(`owf-${data.list[1].weather[0].id}`);
      followicon[1].className = 'follow-icon owf';
      followicon[1].classList.add(`owf-${data.list[2].weather[0].id}`);
      followicon[2].className = 'follow-icon owf';
      followicon[2].classList.add(`owf-${data.list[3].weather[0].id}`);
      temp.textContent = Math.round(data.list[0].main.temp)+'°';
      follow[0].textContent = Math.round(data.list[1].main.temp)+'°';
      follow[1].textContent = Math.round(data.list[2].main.temp)+'°';
      follow[2].textContent = Math.round(data.list[3].main.temp)+'°';
      adds.innerHTML = ucFirst(data.list[0].weather[0].description) + '<br>' + feelslike + Math.round(data.list[0].main.feels_like) + '°<br>' + wind + 
      Math.round(data.list[0].wind.speed) + speed + '<br>' + humidity + data.list[0].main.humidity + '%';
      timezone = parseInt(data.city.timezone)*1000;
      enrustown = data.city.name;
      country = data.city.country;
      return 0;
    }
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
  else if (e.target.className == 'fbutton'){
    if (localStorage.getItem('measure') != 'imperial')
    {
      if (e.type == 'mouseenter')
        fbutton[0].style.background = 'rgba(0,0,0,0.7)';
      else
        fbutton[0].style.background = 'rgba(0,0,0,0.5)';
    }
  }
  else{
    if (localStorage.getItem('measure') != 'standart')
    {
      if (e.type == 'mouseenter')
        kbutton[0].style.background = 'rgba(0,0,0,0.7)';
      else
        kbutton[0].style.background = 'rgba(0,0,0,0.5)';
    }
  }

}

async function setTown(e){
    if (e.which == 13 || e.keyCode == 13 || e.type == 'click') {
      town = search.value;
      search.blur();
      isTown = await getWeather(0);
      setMap();
      setCity();
      if (isTown == 0)
      edBackground();
    }
}

function toLnLt(str){
  return (str).split('.')[0] + '°' + ((str).split('.')[1]).substr(0, 2)+"'";
}

async function getCoordinates(){
  const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${town}&key=26a6cc765a894ab2bf73d80cda6edb40&pretty=1&no_annotations=1`);
  const data = await res.json();
  ltlg.innerHTML = latitude + toLnLt(data.results[0].geometry.lat+'') +'<br>' + longitude + toLnLt(data.results[0].geometry.lng+'');
  return data;
}

async function setMap(){
  const data = await getCoordinates();
	mapboxgl.accessToken = 'pk.eyJ1Ijoibmlrc3QiLCJhIjoiY2tvcTJ3NjVwMHJjZDJ5bnV6dHVzdjhlZCJ9.8B-D92hQsycsBHOyCWxtdQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [data.results[0].geometry.lng, data.results[0].geometry.lat],
    zoom: 12
    });
    var marker1 = new mapboxgl.Marker()
    .setLngLat([data.results[0].geometry.lng, data.results[0].geometry.lat])
    .addTo(map);
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

function voiceSearch(){
  if (isactive == 0){
    vbutton[0].style.animationName = 'slidein';
    isactive = 1;
    let lang;
    if (localStorage.getItem('language') == 'EN')
      lang = 'en-US'
    else
      lang = 'ru-RU'
    let transcript;
    SpeechRecognition.lang = lang;
        SpeechRecognition.onresult = async function(event){
          transcript = event.results[0][0].transcript;
            console.log(event.results[0][0].transcript);
            town = transcript.substring(0, transcript.length - 1);
            search.value = transcript.substring(0, transcript.length - 1);
            search.blur();
            isTown = await getWeather(0);
            setMap();
            setCity();
            if (isTown == 0)
            edBackground();
            SpeechRecognition.stop();
            voiceSearch();
        };
  SpeechRecognition.start();
  }
  else{
    SpeechRecognition.stop();
    vbutton[0].style.animationName = 'none';
    isactive = 0;
  }
}

async function start(){
  await getStartMeasure();
  await getLanguage();
  await getWeather(0);
  await edBackground();
  setMap();
  setCity();
  getMeasure();
  showDate();
}

var town,
oldtown,
enrustown,
country,
feelslike,
wind,
humidity,
speed,
latitude,
longitude,
isactive = 0;
var SpeechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
var isEnter = 0;
var timezone;
backbutton.addEventListener('click', edBackground);
langbutton.addEventListener('click', setVisible);
qenbutton.addEventListener('mouseenter',  (() => { isEnter = 1}));
qrubutton.addEventListener('mouseenter', (() => { isEnter = 1}));
qenbutton.addEventListener('mouseleave', (() => { isEnter = 0}));
qrubutton.addEventListener('mouseleave', (() => { isEnter = 0}));
qenbutton.addEventListener('click', setLanguage);
qrubutton.addEventListener('click', setLanguage);
qcbutton.addEventListener('click', setMeasure);
qfbutton.addEventListener('click', setMeasure);
qkbutton.addEventListener('click', setMeasure);
qcbutton.addEventListener('mouseenter',  hover);
qfbutton.addEventListener('mouseenter', hover);
qkbutton.addEventListener('mouseenter', hover);
qcbutton.addEventListener('mouseleave', hover);
qfbutton.addEventListener('mouseleave', hover);
qkbutton.addEventListener('mouseleave', hover);
langbutton.addEventListener('blur', setNoneVisible);
search.addEventListener('keypress', setTown);
searchbutton.addEventListener('click', setTown);
voicebutton.addEventListener('click', voiceSearch);

document.body.style.backgroundImage = "url('back.jpg')";
start();