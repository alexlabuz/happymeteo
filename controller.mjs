import { getSearch, getForecast } from "./requestService.mjs";


var searchInputElm = document.getElementById("cityInput");
var listCityElm = document.getElementById("listCity");

async function displaySearch(e) {
    var citys = await getSearch(e.target.value);
    
    listCityElm.innerHTML = "";
    citys.forEach(element => {
        var cityItem = document.createElement("div");
        cityItem.className = "cityItem";
        cityItem.textContent = element.name;
        listCityElm.appendChild(cityItem);
        cityItem.addEventListener("click", onClickCity.bind());
    });
}

function onClickCity(e){
    
    displayData(e.target.textContent)
}

async function displayData(e) {
    var forecast = await getForecast(e != null ? e : null)
    messageError("");
    if(forecast !== null){
        document.getElementById("city").textContent = forecast.location.name
        document.getElementById("temp").textContent = forecast.current.temp_c + " °C"
        document.getElementById("icon").src = forecast.current.condition.icon    
    }else{
        messageError("Ville inconnu")
    }
}

function messageError(message) {
    if (message === "") {
        document.getElementById("display_forecast").style.display = null;
        document.getElementById("error_message").style.display = "none";
        document.getElementById("error_message").textContent = null;
    }else{
        document.getElementById("display_forecast").style.display = "none";
        document.getElementById("error_message").style.display = null;
        document.getElementById("error_message").textContent = message;
    }
}

export function initializeEvent(){
    searchInputElm.addEventListener("input", displaySearch)
}


export function defaultData(params) {
    displayData();
    initializeEvent();
}
