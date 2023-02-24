const GET_ALL_TICKETS = "SELECT * FROM public.tickets ORDER BY id ASC ";

const CREATE_TICKET = "INSERT INTO public.tickets VALUES (2,3)";

module.exports = {
  GET_ALL_TICKETS,
  CREATE_TICKET,
};
