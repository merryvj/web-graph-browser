
import url from "url";

export async function scraper(browser, _url){
	console.log("going to " + _url);
	const page = await browser.newPage();
	await page.goto(_url);
	let targetHost = url.parse(_url, true).host.toLowerCase();

	//get all urls on page
	let links = await page.$$eval('a', as => as.map(a => a.href));

	//filter links for duplicates
	links = [...new Set(links)];
	links = links.filter((link) => filterLink(link));

	const mainTitle = await page.title();

	const result = {
		link: _url,
		content: mainTitle,
		children: [],
	};

	//visit each url to get data
	for (let link of links) {
		let parsedLink = url.parse(link, true);
		if (parsedLink.host.toLowerCase() != targetHost) {
			const wwwPattern = /^https?:\/\/(www\.)/i;
			const linkName = parsedLink.host.replace(wwwPattern, '');

			result.children.push({
				link: link,
				content: linkName,
				children: [link]
			})
		} else {
			await page.goto(link);
			const childLinks = await page.$$eval('a', as => as.map(a => a.href));
			const slugRegex = /\/([^/]+)\/?$/;
			const linkSlug = parsedLink.href.match(slugRegex)[1];
			const cleanSlug = makeCleanSlug(linkSlug);

			result.children.push({
				link: link,
				content: cleanSlug,
				children: [...new Set(childLinks)]
			})
		}
	}

	console.log(result)
	return result;
}

function filterLink(link) {
	if (link.includes('#') || link.startsWith('javascript:') || link.startsWith('mailto:')) {
		return false;
	}

	return true;
}

function makeCleanSlug(slug) {
	let arr = slug.split("-");
	let firstLetter = arr[0].charAt(0);
	arr[0] = firstLetter.toUpperCase() + arr[0].slice(1);
	return arr.join(" ");
}
