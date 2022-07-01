import { Page } from "puppeteer";

const getRolletBarLastColors = async ({ page }: { page: Page }) => {
	const elements = await page.$$(".sm-box");
	const colors = [];
	for (let i = 0; i < 4; i++) {
		const element = elements[i];
		const classList: string = await (
			await element.getProperty("className")
		).jsonValue();
		colors.push(classList.split(" ")[1]);
	}
	return colors;
};

export { getRolletBarLastColors };
