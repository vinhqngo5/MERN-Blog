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

const URI = process.env.DATABASE_URL;

// limit maximum of req from client to server
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

// providing a Connect/Express middleware to enable CORS with various options
app.use(cors());

// resolve strict-origin-when-cross-origin
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Request methods you wish to allow
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});

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
