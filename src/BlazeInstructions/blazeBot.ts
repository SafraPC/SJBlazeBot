import puppeteer from "puppeteer";

const blazeWebsite = "https://blaze.com/pt/games/double";
//rpItem  classList that we need to open and click in the element
const bot = async () => {
	const browser = await puppeteer.launch({ headless: false, devtools: true });
	const page = await browser.newPage();
	page.goto(blazeWebsite);
};

export default bot;
