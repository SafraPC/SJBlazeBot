import express from "express";
import initBlazeBot from "./blaze/createBlazeInstance/index";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initBlazeBot();
app.listen(port, () => {
	console.log(`Server is Running on Port ${port}`);
});
