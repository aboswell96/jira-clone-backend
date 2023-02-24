const pg = require("pg");
const { GET_ALL_USERS } = require("../queries/users");

const localCredentials = {
  user: "postgres",
  host: "localhost",
  database: "nodedemo",
  password: "root",
  port: 5432,
};

const clientDemo = async () => {
  const client = new pg.Client(
    "postgresql://postgres:kawhi2spurs@localhost:5432"
  );
  await client.connect();
  const now = await client.query(GET_ALL_USERS);
  await client.end();

  return now;
};

module.exports = {
  localCredentials,
  clientDemo,
};
