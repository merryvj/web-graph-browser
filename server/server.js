const browserObject = require('./scraper/browser');
const scraperController = require('./scraper/pageController');

const PORT = process.env.PORT || 5050;
const cors = require("cors")
const express = require("express")
const bodyParser = require('body-parser')
const app = express()

const jsonParser = bodyParser.json()

const corsOptions = {
    origin: 'https://wobbly-browser.onrender.com'
}

app.use(cors(corsOptions));


app.post('/api/url', jsonParser, (req, res) => {
    console.log("hi")
    const {url} = req.body;

    let browserInstance = browserObject.startBrowser();
    scraperController(browserInstance, url).then((data) => res.json(data));
});


app.listen(PORT, () => {console.log("Server started on port")})