//http://api.weatherapi.com/v1/current.json?key=ad8d1a5eb1dc42289c6164525230307&q=Bangalore&aqi=no

const temperatureField = document.querySelector(".temperature");
const locationField = document.querySelector(".time_location p");
const dateAndTimeField = document.querySelector(".time_location span");
const conditionText = document.querySelector(".condition p");
const conditionIcon = document.querySelector(".condition img");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);
let target = "Bangalore";

//get the wheather data
const fetchWheatherData = async (targetLocation) =>{
    let url = `http://api.weatherapi.com/v1/current.json?key=ad8d1a5eb1dc42289c6164525230307&q=${targetLocation}&aqi=no`

    const response = await fetch(url)

    const data = await response.json()

    let locationName = data.location.name

    let localTime = data.location.localtime

    let temp = data.current.temp_c
    

    let temp_condition = data.current.condition.text
    let icon = data.current.condition.icon
    
    updateValues(locationName, temp, localTime, temp_condition, icon)
}

function updateValues(location, temperature, time, condition, icon) {


    //Split the data & time as api is giving with in the same field
    let splitDate  = time.split(' ')[0];
    let splitTime = time.split(' ')[1];

    let currentDay = getDayName(new Date(splitDate).getDay());
    temperatureField.innerText = temperature
    locationField.innerText = location
    dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionText.innerText = condition
    conditionIcon.src = icon

}
function searchForLocation(e){
    e.preventDefault()

    target = searchField.value

    fetchWheatherData(target)
}
fetchWheatherData(target)

function getDayName(number){
    switch(number){
        case 0 : return "Sunday";
        case 1 : return "Monday";
        case 2 : return "Tuesday";
        case 3 : return "Wednesday";
        case 4 : return "Thursday";
        case 5 : return "Friday";
        case 6 : return "Saturday"
    }
}