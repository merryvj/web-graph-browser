const browserObject = require('./scraper/browser');
const scraperController = require('./scraper/pageController');

const express = require("express")
const bodyParser = require('body-parser')
const app = express()

const jsonParser = bodyParser.json()

app.post('/api/url', jsonParser, (req, res) => {
    console.log("hi")
    const {url} = req.body;

    let browserInstance = browserObject.startBrowser();
    scraperController(browserInstance, url).then((data) => res.json(data));
});


app.listen(5051, () => {console.log("Server started on port")})