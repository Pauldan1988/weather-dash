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
        .catch(error => error)
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
const userData = document.getElementById("userInput")


function currDisplay(todayWeather) {
    spanCC.textContent = todayWeather.name
    spanCT.textContent = todayWeather.main.temp
    imgCI.src = `http://openweathermap.org/img/wn/${todayWeather.weather[0].icon}.png`
    // Call the formatDate function and pass todayWeather.dt*1000 as a parameter
    spanCD.textContent = formatDate(todayWeather.dt * 1000)
    spanCW.textContent = todayWeather.wind.speed
    spanCH.textContent = todayWeather.main.humidity
}

const fiveDaydivCont = document.getElementById("five-day-forecast").children

function fiveDayDisplay(fiveDayWeather) {
    let currentDayIndex = 0
    for (let i = 6; i < fiveDayWeather.list.length; i += 8) {
        displayDayX(fiveDayWeather.list[i], currentDayIndex) // i represents the data point for the appropartate day 
        currentDayIndex++  // This must be at the end
    }


    // displayDayX(fiveDayWeather.list[0], 0)
}

function displayDayX(weatherData, dayDisplayed) {
    const dayDiv = fiveDaydivCont[dayDisplayed].children
    dayDiv[0].src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
    dayDiv[1].textContent += ": " + weatherData.main.temp
    dayDiv[2].textContent += ": " + weatherData.wind.speed
    dayDiv[3].textContent += ": " + weatherData.main.humidity
}

formE1.addEventListener("submit", async eventObject => {
    eventObject.preventDefault()
    var citySearch = eventObject.target.children[1].value
    var latlon = await getLatLong(citySearch)
    if (latlon.lat) {
        var todayWeather = await getWeather(latlon)
        const fiveDayWeather = await getFiveWeather(latlon)
        currDisplay(todayWeather)
        fiveDayDisplay(fiveDayWeather)
        storeSearch(citySearch)
        pullSearches()
    } else {
        alert(`${citySearch} Is an invalid search. Please check your spelling and search again.`)
    }
})

const savedSearchesEl = document.getElementById("saved-city-searches")

savedSearchesEl.addEventListener("click", async eventObject => {
    const buttonSearch = 
})

async function getWeather(latlon) {
    const fetchWeather = await fetch(`${baseURL}/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${APIKey}&units=imperial`)
        .then(value => value.json())
        .catch(error => error)
    return fetchWeather
}

async function getFiveWeather(latlon) {
    const fetch5Weather = await fetch(`${baseURL}/data/2.5/forecast?lat=${latlon.lat}&lon=${latlon.lon}&appid=${APIKey}&units=imperial`)
        .then(value => value.json())
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



function storeSearch(city) {
    window.localStorage.setItem(city, JSON.stringify(city))
}

function pullSearches() { // Also display buttons with previous searches made.
    // get rid of buttons already made and clear container
    const searches = Object.keys(localStorage)
    savedSearchesEl.innerHTML = ""
    searches.forEach(city => {
        const cityButton = document.createElement("button")
        cityButton.textContent = city
        savedSearchesEl.appendChild(cityButton)

    })
}

pullSearches() 
//Store latlon with cityName in local storage in submit event listener
    // create button element dynamicly assign text content(city)
    // append/add button to the button container
