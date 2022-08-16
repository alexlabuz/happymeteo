export async function getSearch(c) {
    console.log("ok")
    var city = c === "" || c === null ? "London" : c
    var url = "https://api.weatherapi.com/v1/search.json?key=e3659c2490cd410282a145840222407&q=" + city;
    var request = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    return request.status == 400 ? null : await request.json();
}

export async function getForecast(c) {
    var city = c
    var url = "http://api.weatherapi.com/v1/forecast.json?key=e3659c2490cd410282a145840222407&q=" + city + "&days=1&aqi=no&alerts=no"
    var request = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

    return request.status == 400 ? null : await request.json();
}
    
