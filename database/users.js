const { pgClient } = require("./postgres");
const uuid = require("uuid");

const getUsers = async () => {
  const GET_ALL_USERS = "SELECT * FROM public.users ORDER BY id ASC ";
  const result = await pgClient.query(GET_ALL_USERS);
  return result;
};

const createUser = async (firstName, lastName, photoUrl) => {
  const CREATE_USER = `INSERT INTO public.users VALUES ($1,$2,$3,$4)`;
  const id = uuid.v1();
  const createUserResult = await pgClient.query(CREATE_USER, [
    firstName,
    lastName,
    photoUrl,
    id,
  ]);
  const GET_USER = `SELECT * FROM public.users where id=$1`;
  const getUserResult = await pgClient.query(GET_USER, [id]);
  return getUserResult;
};

const getUser = async (userId) => {
  GET_USER = `SELECT * FROM public.users where id=$1`;
  const result = await pgClient.query(GET_USER, [userId]);
  return result;
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
