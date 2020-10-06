/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=',
    apiKey = '&appid=447ad4230f5fdb7f85b6b8c18a5422b1&units=imperial',
    btn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
/* Here I have added 1 to the months as getMonth returns an array that starts from 
0 index with January so we need to add 0+1 to log 1 not 0 and same for other Months*/
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', callAction);
/* Function called by event listener */
function callAction (){
    const feeling = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseUrl, zipCode, apiKey)
    //Chain Other Promises (Post Request & Update UI)
    .then(function(data){
        try{
            postData('/addtemp', {temp: data.main.temp, date: newDate, userRes: feeling, 
                desc: data.weather[0].description, icon: data.weather[0].icon, country: data.sys.country});
            updateUI();
        } catch(error) {
            document.getElementById('error').innerHTML = `Error: Invalid zip code.`;
            document.getElementById('hide').classList.remove('hide');
            document.getElementById('beforeResult').classList.add('hide');
            document.getElementById('noError').classList.add('hide');
            document.getElementById('error').classList.remove('hide');
            console.log("error", error);
        }
    })
};
/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zipCode, apiKey)=>{
    const res = await fetch(baseUrl+zipCode+apiKey);
    try{
        const data = await res.json();
        return data;
    } catch(error) {
        document.getElementById('error').innerHTML = `Error: ${error}`;
        document.getElementById('hide').classList.remove('hide');
        document.getElementById('beforeResult').classList.add('hide');
        document.getElementById('noError').classList.add('hide');
        document.getElementById('error').classList.remove('hide');
        console.log("error", error);
    }
};
/* Function to POST Data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
        document.getElementById('error').innerHTML = `Error: ${error}`;
        document.getElementById('hide').classList.remove('hide');
        document.getElementById('beforeResult').classList.add('hide');
        document.getElementById('noError').classList.add('hide');
        document.getElementById('error').classList.remove('hide');
    }
};
/* Function to GET Project Data & Update UI */
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temp: ${allData.temp} F | ${
            Math.round((((allData.temp - 32)/1.8) + Number.EPSILON)*100)/100} C`;
        document.getElementById('content').innerHTML = `Feeling: ${allData.userRes}`;
        document.getElementById('country').innerHTML = `${allData.country}`;
        document.getElementById('weatherIcon').alt= allData.desc;
        document.getElementById('weatherIcon').src= 
        `http://openweathermap.org/img/wn/${allData.icon}@4x.png`;
        document.getElementById('desc').innerHTML = `${allData.desc}`;
        document.getElementById('hide').classList.remove('hide');
        document.getElementById('noError').classList.remove('hide');
        document.getElementById('beforeResult').classList.add('hide');
        document.getElementById('error').classList.add('hide');
    } catch(error) {
        console.log("error", error);
        document.getElementById('error').innerHTML = `Error: ${error}`;
        document.getElementById('hide').classList.remove('hide');
        document.getElementById('beforeResult').classList.add('hide');
        document.getElementById('noError').classList.add('hide');
        document.getElementById('error').classList.remove('hide');
    }
};