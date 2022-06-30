import puppeteer from "puppeteer";
import { delay } from "../helper/delay";

const blazeWebsite = "https://blaze.com/pt/games/double";
//rpItem  classList that we need to open and click in the element
const bot = async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.goto(blazeWebsite);

  await delay(5000);

  const elements = await page.$$(".sm-box");

  const colors = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const classList: string = await (
      await element.getProperty("className")
    ).jsonValue();
    colors.push(classList.split(" ")[1]);
  }

  const lastColors = colors.filter((_, index) => index < 4);
  console.log("🚀 lastColors", lastColors);

  const playBlack = lastColors.every((item) => item === "black");
  const playRed = lastColors.every((item) => item === "red");
  console.log("🚀 playBlack", playBlack);
  console.log("🚀 playRed", playRed);

  if (playBlack) {
    console.log("black");
  } else if (playRed) {
    console.log("red");
  } else {
    console.log("no color");
  }
};

export default bot;
