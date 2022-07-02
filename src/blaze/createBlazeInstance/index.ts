import { Connection } from "mysql2/typings/mysql";
import blazeBot from "./app";

const init = async (connection: Connection) => {
	try {
		await blazeBot(connection);
	} catch (e) {
		console.log(e);
	}
};

export default init;
