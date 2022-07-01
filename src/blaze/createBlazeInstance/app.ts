import {
	getRolletBarLastColors,
	verifyWhitePosition,
} from "../controllers/getRolletBarColors";
import { createPuppeteerInstance } from "../createPuppeteerInstance";

const play = [1.8, 3.6, 7.2, 14.4, 28.8]; //113,4

const bot = async () => {
	const { page } = await createPuppeteerInstance();

	const colors = await getRolletBarLastColors({ page });
	const whiteIndex = await verifyWhitePosition({ page });

	const playBlack = colors.every((item) => item === "red");
	const playRed = colors.every((item) => item === "black");
};

export default bot;
