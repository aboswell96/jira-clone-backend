const { pgClient } = require("./postgres");
const uuid = require("uuid");

const getComments = async () => {
  const GET_ALL_COMMENTS = "SELECT * FROM public.comments ORDER BY id ASC ";
  const result = await pgClient.query(GET_ALL_COMMENTS);
  return result;
};

const createComment = async (msg = "default msg", userId = 4, ticketId = 2) => {
  const CREATE_COMMENT = `INSERT INTO public.comments VALUES ($1,$2,$3,$4,$5)`;
  const id = uuid.v1();
  const createCommentResult = await pgClient.query(CREATE_COMMENT, [
    msg,
    Date.now(),
    userId,
    id,
    ticketId,
  ]);
  const GET_COMMENT = `SELECT * FROM public.comments where id=$1`;
  const getCommentResult = await pgClient.query(GET_COMMENT, [id]);
  return getCommentResult;
};

module.exports = {
  getComments,
  createComment,
};
