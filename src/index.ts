import express from "express";
import initBlazeBot from "./blaze/createBlazeInstance/index";
import { connectMysql } from "./services/database";

const initApp = async () => {
	const app = express();
	const port = 3000;

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	const { connection }: { connection: any } = await connectMysql();

	if (connection) {
		await initBlazeBot(connection);
	}

	app.listen(port, () => {
		console.log(`Server is Running on Port ${port}`);
	});
};

initApp();
