'use-strict'

window.onload = () => {
    getAllCountries();
}

let select = document.getElementById("countries");
let main = document.querySelector('.main-container');

select.addEventListener("change",function(){
    getDataCovid(select.value);
})

var covidData = [];

async function getAllCountries() {
    var result = await fetch("https://restcountries.eu/rest/v2/all");
    let response = await result.json();
    createOptions(response);
}

async function getDataCovid(country){
    covidData = [];
    const result = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`);
    let resultado = await result.json();
    
    let conf = {}
    let deaths = {}
    let cured = {}

    conf.title = "Confirmed";
    conf.quantity = resultado.All.confirmed;

    deaths.title = "Deaths";
    deaths.quantity = resultado.All.deaths;

    cured.title = "Cured";
    cured.quantity = resultado.All.recovered;

    covidData.push(conf);
    covidData.push(deaths);
    covidData.push(cured);

    createCard(covidData);
    
}

const createCard = (data) => {
    main.innerHTML = "";
    data.forEach(data => {
        section = document.createElement('section');
    
        card = document.createElement('div');
        card.classList.add('card');
    
        title = document.createElement('h2')
        title.innerHTML = data.title;
    
        quantity = document.createElement('h3');
        quantity.innerHTML = data.quantity;

        card.appendChild(title);
        card.appendChild(quantity);

        section.appendChild(card);

       
        main.appendChild(section);

    })
    
}

const createOptions = (countries) => {
    countries.forEach(country => {

        option = document.createElement("option");
        option.value = country.name;
        option.innerHTML = country.name;

        select.appendChild(option);
    })
}