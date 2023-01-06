var APIKey = "9ae95c4aaf533d72feba79f29994de45"
var baseURL = "https://api.openweathermap.org"
var geoURL = "/geo/1.0/direct?q="
var geoFiveURL = ""


async function getLatLong(cityName) {
    const latlon = await fetch(`${baseURL}${geoURL}${cityName},,US&limit=1&appid=${APIKey}`)
        .then(value => value.json())
        .then(value => {
            const { lat, lon } = value[0]
            return { lat, lon }
        })
        return latlon
    }


const body = document.body
const formE1 = document.getElementById("form")
const spanCC = document.getElementById("currcity")
const spanCD = document.getElementById("currdate")
const imgCI = document.getElementById("curricon")
const spanCT = document.getElementById("currtemp")
const spanCW = document.getElementById("currwind")
const spanCH = document.getElementById("currhumid")

function currDisplay(todayWeather) {
    spanCC.textContent = todayWeather.name
    spanCT.textContent = todayWeather.main.temp
    imgCI.src =`http://openweathermap.org/img/wn/${todayWeather.weather[0].icon}.png`
    // Call the formatDate function and pass todayWeather.dt*1000 as a parameter
    spanCD.textContent = formatDate(todayWeather.dt*1000) 
    spanCW.textContent = todayWeather.wind.speed
    spanCH.textContent = todayWeather.main.humidity
}


const fiveDaydivCont = document.getElementById("five-day-forecast").children
// const fiveDayDivOne = document.getElementById("day1").children
// const fiveDayDivTwo = document.getElementById("day2").children
// const fiveDayDivThree = document.getElementById("day3").children
// const fiveDayDivFour = document.getElementById("day4").children
// const fiveDayDivFive = document.getElementById("day5").children
const fiveDaySpanE = document.getElementById("emoji")
// const fiveDaySpanT = document.getElementById("temp")
// const fiveDaySpanW = document.getElementById("wind")
// const fiveDaySpanH = document.getElementById("humidity")


function fiveDayDisplay(fiveDayWeather) {
    // fiveDayDivOne[0].src =`http://openweathermap.org/img/wn/${fiveDayWeather.list[0].weather[0].icon}.png`
    // fiveDayDivOne[1].textContent = fiveDayWeather.list[0].main.temp
    // fiveDayDivOne[2].textContent = fiveDayWeather.list[0].wind.speed
    // fiveDayDivOne[3].textContent = fiveDayWeather.list[0].main.humidity
    // fiveDayDivTwo[0].src =`http://openweathermap.org/img/wn/${fiveDayWeather.list[8].weather[0].icon}.png`
    // fiveDayDivTwo[1].textContent = fiveDayWeather.list[8].main.temp
    // fiveDayDivTwo[2].textContent = fiveDayWeather.list[8].wind.speed
    // fiveDayDivTwo[3].textContent = fiveDayWeather.list[8].main.humidity
}

function displayDayX(weatherData, dayDisplayed) {
    const dayDiv = fiveDaydivCont[dayDisplayed]
    console.log(dayDiv)
}

formE1.addEventListener("submit", async eventObject => {
    eventObject.preventDefault()
    var citySearch = eventObject.target.children[1].value
    var latlon = await getLatLong(citySearch)
    var todayWeather = await getWeather(latlon)
    const fiveDayWeather = await getFiveWeather(latlon)
    console.log(fiveDayWeather)
    currDisplay(todayWeather)
    // fiveDayDisplay(fiveDayWeather)
})

async function getWeather(latlon) {
    const fetchWeather = await fetch(`${baseURL}/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${APIKey}&units=imperial`)
    .then (value => value.json())
   return fetchWeather
}

async function getFiveWeather(latlon) {
    const fetch5Weather = await fetch(`${baseURL}/data/2.5/forecast?lat=${latlon.lat}&lon=${latlon.lon}&appid=${APIKey}&units=imperial`)
    .then (value => value.json())
    return fetch5Weather
}


function formatDate(dateInMilli) {
    const date = new Date(dateInMilli)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const dayToday = date.getDate()
    return `${month} ${dayToday} ${year}`
}



function getUserInput() {
    window.localStorage.setItem("element", JSON.stringify())
}

function getAPI() {

}