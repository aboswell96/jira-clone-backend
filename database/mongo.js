// ./src/database/mongo.js
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
// const { MongoClient } = require("mongodb").MongoClient;

let database = null;

// async function startDatabase() {
//   const mongo = new MongoMemoryServer();
//   // const mongoDBURL = await mongo.getConnectionString();
//   mongo.
//   const mongoDBURL = "mongodb://127.0.0.1:27017";
//   const connection = await MongoClient.connect(mongoDBURL, {
//     useNewUrlParser: true,
//   });
//   database = connection.db();
// }

async function startDatabase() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const connection = await MongoClient.connect(uri, {
    useNewUrlParser: true,
  });
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};
