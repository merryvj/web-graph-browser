import { startBrowser } from './scraper/browser.js';
import express from 'express';
import bodyParser from 'body-parser';
import { scrapeAll } from './scraper/pageController.js';
import cors from 'cors';
import { summarize } from './ai/summary.js';

const PORT = process.env.PORT || 5050;
const app = express();

let scrapedData = null;

const jsonParser = bodyParser.json();

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions));

app.post('/api/url', jsonParser, (req, res) => {
    const { url } = req.body;

    let browserInstance = startBrowser();
    scrapeAll(browserInstance, url).then((data) => {
        scrapedData = data;
        res.json(data);
    });
});

app.post('/api/summary', jsonParser, (req, res) => {
    const {body} = req.body;
    console.log("body");
    summarize(body).then((data => {
        res.json(data);
    }))
})

app.get('/', async (req, res) => {
    res.send('Scraping server up and running :D');
    
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
