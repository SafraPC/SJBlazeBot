import {
	canPlay,
	getRolleteColors,
	verifyWhitePosition,
} from "../controllers/getRolletBarColors";
import { createPuppeteerInstance } from "./createPuppeteerInstance";

const totalPlaytime = [2, 4, 8, 16, 32];

const bot = async () => {
	const { page } = await createPuppeteerInstance();
	let rollete = await getRolleteColors({ page });
	let whiteSurplusPosition = 20;
	let whitePosition = 0;
	const isPlaying = setInterval(async () => {
		console.clear();
		console.log(await canPlay({ page }));
		// const newRollete = await getRolleteColors({ page });
		// if (JSON.stringify(rollete) === JSON.stringify(newRollete)) {
		// 	console.log("mesmo");
		// } else {
		// 	console.log("mudou");
		// 	rollete = newRollete;
		// }

		// const whiteIndex = await verifyWhitePosition({ page });
		// const playBlack = rollete.every((item) => item === "red");
		// const playRed = rollete.every((item) => item === "black");
	}, 3000);
};

export default bot;
