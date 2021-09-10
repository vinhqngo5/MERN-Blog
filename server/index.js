import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import posts from "./routers/posts.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const URI = process.env.DATABASE_URL

// limit maximum of req from client to server
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

// providing a Connect/Express middleware to enable CORS with various options
app.use(cors());

// HTTP loggers
app.use(morgan("combined"));

// connect mongoose
mongoose
	.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connect to mongoose");
	})
	.catch((err) => {
		console.error(err);
	});

app.use("/posts", posts);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
