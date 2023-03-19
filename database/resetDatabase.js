const { pgClient } = require("./postgres");

const deleteAllDatabaseRowsAndInsertSeededData = async () => {
  //Delete all tickets
  const deleteTicketRows = "DELETE FROM public.tickets";

  const deleteTicketRowsResult = await pgClient.query(deleteTicketRows);

  const seededTickets = [
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "backlog",
      last_updated: Date.now(),
      priority: "sev2",
      title: "This is an issue of type Story",
      type: "story",
      user_id: "",
      id: "319eca7c-c67e-11ed-afa1-0242ac120002",
      reporter_id: "",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "backlog",
      last_updated: Date.now(),
      priority: "sev1",
      title:
        "Try dragging issues around to different columns to transition their status",
      type: "story",
      user_id: "",
      id: "3a345b0c-c67e-11ed-afa1-0242ac120002",
      reporter_id: "",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "inDevelopment",
      last_updated: Date.now(),
      priority: "high",
      title: "Try clicking on an Issue to see more information",
      type: "story",
      user_id: "",
      id: "71c4b62a-c67e-11ed-afa1-0242ac120002",
      reporter_id: "",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "inDevelopment",
      last_updated: Date.now(),
      priority: "high",
      title:
        "Try using the board filters to search issues by assignee or title",
      type: "story",
      user_id: "",
      id: "bd70d50e-c67e-11ed-afa1-0242ac120002",
      reporter_id: "",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "inDevelopment",
      last_updated: Date.now(),
      priority: "low",
      title:
        "Users can also leave comments on an issue - Try Leaving a comment on an issue",
      type: "task",
      user_id: "",
      id: "d74de750-c67e-11ed-afa1-0242ac120002",
      reporter_id: "",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "backlog",
      last_updated: Date.now(),
      priority: "sev2",
      title:
        "Issues can be assigned a priority (lowest to highest) and a type (Bug,Task,Story)",
      type: "story",
      user_id: "",
      id: "12ca9d14-c67f-11ed-afa1-0242ac120002",
      reporter_id: "",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "inProgress",
      last_updated: Date.now(),
      priority: "low",
      title: "Each Issue has one reporter and one assignee",
      type: "story",
      user_id: "",
      id: "920143d0-c67f-11ed-afa1-0242ac120002",
      reporter_id: "",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "backlog",
      last_updated: Date.now(),
      priority: "low",
      title:
        "Issues can be deleted by clicking on the issue and using the Delete button",
      type: "story",
      user_id: "",
      id: "40cb559a-c680-11ed-afa1-0242ac120002",
      reporter_id: "",
      time_created: Date.now(),
    },
  ];

  const CREATE_TICKET = `INSERT INTO public.tickets VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
  seededTickets.forEach(
    async (ticket) =>
      (createTicketResult = await pgClient.query(CREATE_TICKET, [
        ticket.description,
        ticket.swimlane,
        ticket.last_updated,
        ticket.priority,
        ticket.title,
        ticket.type,
        ticket.user_id,
        ticket.id,
        ticket.reporter_id,
        ticket.time_created,
      ]))
  );
};

module.exports = {
  deleteAllDatabaseRowsAndInsertSeededData,
};
