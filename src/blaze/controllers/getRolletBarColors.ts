import { Page } from "puppeteer";

type PageProps = {
	page: Page;
};

const getRolletBarLastColors = async ({ page }: PageProps) => {
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

const verifyWhitePosition = async ({ page }: PageProps) => {
	const elements = await page.$$(".sm-box");
	const colors = [];
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const classList: string = await (
			await element.getProperty("className")
		).jsonValue();
		colors.push(classList.split(" ")[1]);
	}

	const whitePosition = colors.findIndex((item) => item === "white");
	return whitePosition + 1;
};

export { getRolletBarLastColors, verifyWhitePosition };
