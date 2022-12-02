btnSearch = document.querySelector('.btnSearch')
rechercheVille = document.querySelector('.inputSearch')
p = document.getElementById("resultMeteo")

btnSearch.addEventListener('click', ()=>{
    let ville = rechercheVille.value
    console.log(ville)
    getMeteoVille(ville)
})

async function getMeteoVille(ville){
    let reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville},fr&APPID=43cda87ffe3718c14c0fa51a5e3c410e`)
    let data = await reponse.json()
    console.log(data)

    /*
    let longitude = await data.main.latitude
    let latitude = await data.main.longitude
    console.log(longitude)
    console.log(latitude)
    */

    let temperature = Math.round((data.main.temp)-273.15) // formule pour transformer Kelvin en degré : valeurK − 273,15 = valeur°C
    let meteoCondition = data.weather[0].main
    console.log(Math.round(temperature))
    console.log(meteoCondition)
    let thermemeter = "thermemeterLow"
    if (temperature<=0){thermemeter = "thermemeterSnow"}
    else{if (temperature<=10){thermemeter = "thermemeterLow"}
        else{if (temperature<=20){thermemeter = "thermemeterHalf"}
            else{if (temperature<=30){thermemeter = "thermemeterHight"}
                else{if (temperature<=40){thermemeter = "thermemeterSun"}
                    }}}}

    // INSERTION ELEMENT TEMPERATURE//

    let thermemeterIcon = document.createElement("div")
    thermemeterIcon.classList.add("icon","thermemeter" ,`${thermemeter}`, "1")
    //thermemeterIcon.setAttribute('id', 1)
    thermemeterIcon.setAttribute("temperature", Math.round(temperature))
    let nouvP = document.createElement("p")
    nouvP.innerHTML = "La température de : "+ville+" est de "+temperature+" °C"
    p.appendChild(nouvP)
    p.appendChild(thermemeterIcon)

    //let idThermemeterIcon = document.

    // ###### FIN INSERTION ELEMENTS TEMPERATURE ###### //
    // INSERTION ELEMENTS METEO//

    let cloud = "Clouds"
    let cloudRain = "Rain"
    let cloudRainThunder = "Thunder"
    let sun = "Clear"

    if (meteoCondition==cloud)
    {
        console.log('nuage')
        let svg = document.createElement("div")
        svg.classList.add("icon", "cloud", "1")
        p.appendChild(svg)
    }

    if (meteoCondition==cloudRain)
    {
        console.log('pluit')
        let svg = document.createElement("div")
        svg.classList.add("icon", "cloud-Rain", "1")
        p.appendChild(svg)
    }

    if (meteoCondition==cloudRainThunder)
    {
        console.log('orage')
        let svg = document.createElement("div")
        svg.classList.add("icon", "cloud-Rain-Thunder", "1")
        p.appendChild(svg)
    }

    if (meteoCondition==sun)
    {
        console.log('sun')
        let svg = document.createElement("div")
        svg.classList.add("icon", "sun", "1")
        p.appendChild(svg)
    }

    // ###### FIN INSERTION ELEMENTS METEO ###### //
}