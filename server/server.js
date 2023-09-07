import { startBrowser } from './scraper/browser.js';
import express from 'express';
import bodyParser from 'body-parser';
import { scrapeAll } from './scraper/pageController.js';
import cors from 'cors';
import { summarize } from './ai/summary.js';

const PORT = process.env.PORT || 5051;
const app = express();

let scrapedData = null;

const jsonParser = bodyParser.json();

app.post('/api/url', jsonParser, (req, res) => {
    const { url } = req.body;

    let browserInstance = startBrowser();
    scrapeAll(browserInstance, url).then((data) => {
        scrapedData = data;
        res.json(data);
    });
});

app.get('/api/summary', async (req, res) => {
    let summary = "";
    if (scrapedData) {
        let {body} = scrapedData;
        summary = await summarize(body);
        console.log(summary);
    }
    res.json(summary);
})

app.get('/', async (req, res) => {
    res.send('Scraping server up and running :D');
    
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});

// app.post('/api/summarize', async(req, res) => {
//     let summary = await summarize(req.body);
//     res.json(summary);
// })
