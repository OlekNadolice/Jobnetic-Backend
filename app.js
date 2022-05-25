const express = require("express");
const cors = require("cors");
const AuthRouter = require("./Routes/Auth.router");
const AdvertismentRouter = require("./Routes/Advertisment.router");
const bodyParser = require("body-parser");

const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const db = require("./DB");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: "* ",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/auth", AuthRouter);
app.use("/advertisment", AdvertismentRouter);

app.listen(8000, () => {
  console.log("App is running");
});

module.exports = app;
