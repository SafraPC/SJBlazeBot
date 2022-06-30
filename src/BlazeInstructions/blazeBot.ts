import puppeteer from "puppeteer";
import { delay } from "../helper/delay";

const blazeWebsite = "https://blaze.com/pt/games/double";

const play = [1.8, 3.6, 7.2, 14.4, 28.8]; //113,4

const bot = async () => {
	const browser = await puppeteer.launch({ headless: true, devtools: true });
	const page = await browser.newPage();
	await page.goto(blazeWebsite);
	await delay(1500);

	const elements = await page.$$(".sm-box");
	const colors = [];

	for (let i = 0; i < 4; i++) {
		const element = elements[i];
		const classList: string = await (
			await element.getProperty("className")
		).jsonValue();
		colors.push(classList.split(" ")[1]);
	}

	let round = 0;
	const playBlack = colors.every((item) => item === "red");
	const playRed = colors.every((item) => item === "black");
	console.clear();
	console.log(playBlack ? "Jogar preto" : "");
	console.log(playRed ? "Jogar vermelho" : "");
	console.log(!playRed && !playBlack && "Não jogar");
};

export default bot;
