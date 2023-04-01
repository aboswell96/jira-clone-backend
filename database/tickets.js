const { pgClient } = require("./postgres");
const uuid = require("uuid");

const createTicket = async (
  userId,
  description,
  swimlane,
  priority,
  reporterId,
  title,
  ticketType
) => {
  const CREATE_TICKET = `INSERT INTO public.tickets VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
  const id = uuid.v1();
  const now = Date.now();
  const createTicketResult = await pgClient.query(CREATE_TICKET, [
    description,
    swimlane,
    now,
    priority,
    title,
    ticketType,
    userId,
    id,
    reporterId,
    now,
  ]);

  const GET_TICKET = `SELECT * FROM public.tickets where id=$1`;
  const getTicketResult = await pgClient.query(GET_TICKET, [id]);

  return getTicketResult;
};

const getTickets = async () => {
  const GET_TICKETS = `SELECT * FROM public.tickets ORDER BY id ASC`;
  const result = await pgClient.query(GET_TICKETS);
  return result;
};

const getTicket = async (ticketId) => {
  const GET_TICKET = `SELECT * FROM public.tickets where id=$1`;
  const getTicketResult = await pgClient.query(GET_TICKET, [ticketId]);
  return getTicketResult;
};

const updateTicketById = async (ticketId, body) => {
  var query = ["UPDATE public.tickets"];
  query.push("SET");

  var set = [];
  Object.keys(body).forEach((key, i) => {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));

  query.push("WHERE id = " + "'" + ticketId + "'");

  const colValues = Object.keys(body).map((key) => {
    return body[key];
  });

  const UPDATE_TICKET_BY_ID = query.join(" ");

  await pgClient.query(UPDATE_TICKET_BY_ID, colValues);
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicketById,
};
