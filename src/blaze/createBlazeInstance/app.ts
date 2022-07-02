import {
	canPlay,
	getRolleteColors,
	verifyWhitePosition,
} from "../controllers/getRolletBarColors";
import { createPuppeteerInstance } from "./createPuppeteerInstance";

// const totalPlaytime = [2, 4, 8, 16, 32];

const bot = async () => {
	const { page } = await createPuppeteerInstance();
	let whiteSurplusPosition = 20;
	let lastCanPlay = false;

	const playWhite = ({
		canPlayNow,
		whitePosition,
	}: {
		canPlayNow: boolean;
		whitePosition: number;
	}) => {
		if (canPlayNow && lastCanPlay !== canPlayNow && whitePosition === -1) {
			whiteSurplusPosition++;
			console.log(whiteSurplusPosition);
		} else {
			whiteSurplusPosition = 20;
			console.log(whitePosition + 1);
		}
	};

	const isPlaying = setInterval(async () => {
		console.clear();
		const whitePosition = await verifyWhitePosition({ page });
		const canPlayNow = await canPlay({ page });
		playWhite({ canPlayNow, whitePosition });
	}, 3000);
};

export default bot;
