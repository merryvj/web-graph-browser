import {scraper} from "./pageScraper.js";

export async function scrapeAll(browserInstance, url){
	let browser;
	try{
		browser = await browserInstance;
		let scrapedData = await scraper(browser, url);
		return scrapedData;
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

