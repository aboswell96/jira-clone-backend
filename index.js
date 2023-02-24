// ./src/index.js

// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { clientDemo } = require("./database/postgres");

// defining the Express app
const app = express();

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
  res.send("jira clone backend homepage");
});

(async () => {
  const clientResult = await clientDemo();
  console.log("client result " + JSON.stringify(clientResult.rows));
})();

// start the server
const host = "0.0.0.0";
const port = process.env.PORT || 3000;
app.listen(port, host, async () => {
  console.log("listening on host=" + host + ",port=" + port);
});
