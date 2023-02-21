// ./src/index.js

// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// const { startDatabase } = require("./database/mongo");
// const { insertAd, getAds } = require("./database/ads");

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [{ title: "Hello, world (again)!" }];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all ads
app.get("/", async (req, res) => {
  res.send("gets ads");
});

// // start the in-memory MongoDB instance
// startDatabase().then(async () => {
//   await insertAd({ title: "Hello, now from the in-memory database!" });

//   // start the server
//   app.listen(3001, async () => {
//     console.log("listening on port 3001");
//   });
// });

// start the server
const host = "0.0.0.0";
const port = process.env.PORT || 3000;
app.listen(port, host, async () => {
  console.log("listening on host=" + host + ",port=" + port);
});
