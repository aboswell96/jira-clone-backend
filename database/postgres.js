const pg = require("pg");
const { GET_ALL_USERS } = require("../queries/users");

const localClientConfig = "postgresql://postgres:kawhi2spurs@localhost:5432";

const pgClient = new pg.Client(localClientConfig);
pgClient.connect();

const clientDemo = async () => {
  // const client = new pg.Client(localClientConfig);
  await pgClient.connect();
  const now = await pgClient.query(GET_ALL_USERS);
  await pgClient.end();

  return now;
};

module.exports = {
  pgClient,
  clientDemo,
};
