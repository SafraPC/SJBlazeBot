import express from "express";
import bot from "./BlazeInstructions/index";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
bot();
app.listen(port, () => {
	console.log(`Server is Running on Port ${port}`);
});
