import { getSearch, getForecast } from "./requestService.mjs";


var searchInputElm = document.getElementById("cityInput");
var formCityElm = document.getElementById("form_city");
var listCityElm = document.getElementById("listCity");
var openNavBarButtonElm = document.getElementById("openNavBarButton");
var navBarElm = document.getElementById("navBar");
const contentPageElm = document.getElementById("contentPage");

var menuMobileIsOpen = false
var citys = [];

async function displaySearch(e) {
    citys = await getSearch(e.target.value);
    
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
    if(menuMobileIsOpen) openCloseMenu();
}

function onValidCityInput(e) {
    e.preventDefault()
    if(citys.length && searchInputElm.value.length){
        if(menuMobileIsOpen) openCloseMenu();
        displayData(citys[0].name)
    }
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

function openCloseMenu() {
    if(!menuMobileIsOpen){
        navBarElm.style.left = 0;
        menuMobileIsOpen = true
    }else{
        navBarElm.style.left = -100+"%";
        menuMobileIsOpen = false
    }
}

export function initializeEvent(){
    searchInputElm.addEventListener("input", displaySearch)
    formCityElm.addEventListener("submit", onValidCityInput)
    openNavBarButtonElm.addEventListener("click", openCloseMenu)
}


export function defaultData() {
    displayData("London");
    initializeEvent();
}
