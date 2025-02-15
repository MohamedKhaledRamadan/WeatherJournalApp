// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
const server = app.listen(port, ()=>{console.log(`server is running on localhost: ${port}`)});
// Routes
app.get('/all', (req, res)=>{res.send(projectData)});
app.post('/addtemp', (req, res)=>{
    const allData = req.body;
    projectData['temp'] = allData.temp;
    projectData['date'] = allData.date;
    projectData['userRes'] = allData.userRes;
    projectData['desc'] = allData.desc;
    projectData['icon'] = allData.icon;
    projectData['country'] = allData.country;
    res.send(projectData);
    console.log(projectData);
});