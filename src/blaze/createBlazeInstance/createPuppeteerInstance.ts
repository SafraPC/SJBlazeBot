import puppeteer from "puppeteer";
import { delay } from "../../helpers/delay";

const blazeWebsite = "https://blaze.com/pt/games/double";
const createPuppeteerInstance = async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.goto(blazeWebsite);
  await delay(2500);

  return {
    page,
  };
};

export { createPuppeteerInstance };
