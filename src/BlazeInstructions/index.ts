import blazeBot from "./blazeBot";
const init = async () => {
	try {
		await blazeBot();
	} catch (e) {
		console.log(e);
	}
};

export default init;
