# [WIP 🚧] Wobbly Web Browsing
This is a prototype for a web browsing "tool" that visualizes all links from a website with a force graph. Visit links to jump from page to page, or from site to site! Inspired by the graph view of notes and backlinks in [Obsidian](https://obsidian.md/). 

[Live demo](https://wobbly-browser.onrender.com)

https://github.com/merryvj/graph-browser/assets/41601131/71165efc-f180-4898-b1ae-5379a9ae09bc

### Limitations
This uses an iFrame to embed the active website. Websites that do not allow embedding will not display. Additionally, clicking links within the embedeed iFrame will not trigger updates to the graph. 

### Built with
* React
* d3.js
* Puppeteer (for web scraping)
* Express

