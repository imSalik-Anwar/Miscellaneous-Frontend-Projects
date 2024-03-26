// fetch the current day's image to show on the page
const baseURL = "https://api.nasa.gov/planetary/apod";
const apiKey = "nBiaTcszJUC5bIylgVtvUpgHRQ7cD39KEtxzIyB9";
const inputDate = document.getElementById('search-input');

document.addEventListener("DOMContentLoaded", async () => {
    // prepare complete URL
    const URL = baseURL + '?api_key=' + apiKey + '&date='+inputDate.value;
    // fetch data using URL
    let response = await fetch(URL); // response will be fetched in JSON format, convert it into JS object
    let data = await response.json();
    // show data on HTML page
    updateDOM(data);
});

const searchBtn = document.querySelector('button');
const historyList = document.getElementById('history-list');
searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    // prepare complete URL
    const URL = baseURL + '?api_key=' + apiKey + '&date=' + inputDate.value;
    // fetch data using URL
    let response = await fetch(URL); // response will be fetched in JSON format, convert it into JS object
    let data = await response.json();
    // show data on HTML page
    updateDOM(data);   
    // update history
    let listItem = document.createElement('li');
    listItem.innerText = data.title + " [" + data.date +"]";
    historyList.prepend(listItem);
});
// update DOM
const mainHeading = document.getElementById('picture-on');
const imageDiv = document.getElementById('image');
const imageTitle = document.getElementById('title');
const para = document.getElementById('para');
function updateDOM(data){
    mainHeading.innerHTML = 'NASA image on '+ data.date;
    imageTitle.innerHTML = data.title;
    para.innerHTML = data.explanation;
    imageDiv.style.backgroundImage = "url('" + data.url + "')"
}