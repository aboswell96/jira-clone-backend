// ./src/index.js

// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createTicket, getTickets, getTicket } = require("./database/tickets");
const { getSettings, updateSetting } = require("./database/settings");
const { getComments, createComment } = require("./database/comments");
const { getUsers, getUser } = require("./database/users");
const {
  deleteAllDatabaseRowsAndInsertSeededData,
} = require("./database/resetDatabase");
// const { clientDemo } = require("./database/postgres");

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

app.post("/tickets", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await createTicket(
    2,
    "test",
    "sl1",
    "low",
    1,
    "dasdasdas",
    "bug"
  );
  res.json({ ...data.rows[0] });
});

app.get("/tickets", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await getTickets();
  console.log(data);
  res.json({ total: data.rows.length, data: data.rows });
});

app.get("/tickets/:ticketId", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await getTicket(req.params.ticketId);
  const comments = await getComments(req.params.ticketId);
  res.json({ ...data.rows[0], comments: comments.rows });
});

app.get("/settings", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await getSettings();
  res.json({ settings: data.rows });
});

app.put("/settings", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await updateSetting();
  res.json({ settings: data.rows });
});

app.get("/comments", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await getComments();
  console.log(data);
  res.json({ total: data.rows.length, data: data.rows });
});

app.post("/comments", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await createComment();
  console.log(data);
  res.json({ ...data.rows[0] });
});

app.get("/users", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await getUsers();
  console.log(data);
  res.json({ total: data.rows.length, data: data.rows });
});

app.get("/users/:userId", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const data = await getUser(req.params.userId);
  res.json({ ...data.rows[0] });
});

app.get("/reset", async (req, res) => {
  await deleteAllDatabaseRowsAndInsertSeededData();
  res.send("Successfully reset database");
});

// (async () => {
//   const clientResult = await clientDemo();
//   console.log("client result " + JSON.stringify(clientResult.rows));
// })();

// start the server
const host = "0.0.0.0";
const port = process.env.PORT || 3001;
app.listen(port, host, async () => {
  console.log("listening on host=" + host + ",port=" + port);
});
