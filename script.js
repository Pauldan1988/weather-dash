var APIKey = "9ae95c4aaf533d72feba79f29994de45"
var baseURL = "https://api.openweathermap.org"
var geoURL = "/geo/1.0/direct?q="


async function getLatLong(cityName) {
    const latlon = await fetch(`${baseURL}${geoURL}${cityName},,US&limit=1&appid=${APIKey}`)
        .then(value => value.json())
        .then(value => {
            const { lat, lon } = value[0]
            return { lat, lon }
        })
        return latlon
    }


// fetch(baseURL + "/data/2.5/weather?q=" + cityName + "&appid=" + APIKey)
// .then (value => value.json())
// .then (value => console.log(value))


var body = document.body
var formE1 = document.getElementById("form")
var spanCC = document.getElementById("currcity")
var spanCD = document.getElementById("currdate")
var imgCI = document.getElementById("curricon")
var spanCT = document.getElementById("currtemp")
var spanCW = document.getElementById("currwind")
var spanCH = document.getElementById("currhumid")


var sidebarBtns = document.getElementById("saved-city-searches")
var button1 = document.body.appendChild()


function currDisplay(todayWeather) {
    spanCC.textContent = todayWeather.name
    spanCT.textContent = todayWeather.main.temp
    imgCI.src =`http://openweathermap.org/img/wn/${todayWeather.weather[0].icon}.png`
    spanCD.textContent = new Date(todayWeather.dt*1000)
    spanCW.textContent = todayWeather.wind.speed
    spanCH.textContent = todayWeather.main.humidity
// console.log(todayWeather.dt)
}



formE1.addEventListener("submit", async eventObject => {
    eventObject.preventDefault()
    var citySearch = eventObject.target.children[1].value
    var latlon = await getLatLong(citySearch)
    var todayWeather = await getWeather(latlon)
    // console.log(todayWeather)
    // var dayToday = await formatDate(dateInMilli)
    currDisplay(todayWeather)
    
})

async function getWeather(latlon) {
    const fetchWeather = await fetch(`${baseURL}/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${APIKey}&units=imperial`)
    .then (value => value.json())
   return fetchWeather
}

async function formatDate(dateInMilli) {
    // Date passed as milliseconds
    // Pass value through to get a legible date
    // Get the month and Get the Year(Similiarly as how I obtained the day)
    // Combine them and return 
    // const date = new Date("January 02nd, 2023 3:12:00")
    // const dayToday = date.getDate(dateInMilli)
}


function getUserInput() {
    window.localStorage.setItem("element", JSON.stringify())
}

function getAPI() {

}