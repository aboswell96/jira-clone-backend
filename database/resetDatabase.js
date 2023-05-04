const { pgClient } = require("./postgres");
const uuid = require("uuid");

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
      user_id: "2da8b05c-c121-11ed-afa1-0242ac120002",
      id: "319eca7c-c67e-11ed-afa1-0242ac120002",
      reporter_id: "2da8b05c-c121-11ed-afa1-0242ac120002",
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
      user_id: "3e0220fa-c121-11ed-afa1-0242ac120002",
      id: "3a345b0c-c67e-11ed-afa1-0242ac120002",
      reporter_id: "4b549e0e-c121-11ed-afa1-0242ac120002",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "inDevelopment",
      last_updated: Date.now(),
      priority: "high",
      title: "Try clicking on an Issue to see more information",
      type: "story",
      user_id: "4b549e0e-c121-11ed-afa1-0242ac120002",
      id: "71c4b62a-c67e-11ed-afa1-0242ac120002",
      reporter_id: "4b549e0e-c121-11ed-afa1-0242ac120002",
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
      user_id: "2da8b05c-c121-11ed-afa1-0242ac120002",
      id: "bd70d50e-c67e-11ed-afa1-0242ac120002",
      reporter_id: "2da8b05c-c121-11ed-afa1-0242ac120002",
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
      user_id: "4b549e0e-c121-11ed-afa1-0242ac120002",
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
      user_id: "4b549e0e-c121-11ed-afa1-0242ac120002",
      id: "12ca9d14-c67f-11ed-afa1-0242ac120002",
      reporter_id: "3e0220fa-c121-11ed-afa1-0242ac120002",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "inProgress",
      last_updated: Date.now(),
      priority: "low",
      title: "Each Issue has one reporter and one assignee",
      type: "story",
      user_id: "3e0220fa-c121-11ed-afa1-0242ac120002",
      id: "920143d0-c67f-11ed-afa1-0242ac120002",
      reporter_id: "4b549e0e-c121-11ed-afa1-0242ac120002",
      time_created: Date.now(),
    },
    {
      description: "Users can add descriptions to their issue here",
      swimlane: "done",
      last_updated: Date.now(),
      priority: "low",
      title:
        "Issues can be deleted by clicking on the issue and using the Delete button",
      type: "story",
      user_id: "",
      id: "40cb559a-c680-11ed-afa1-0242ac120002",
      reporter_id: "3e0220fa-c121-11ed-afa1-0242ac120002",
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

  //Reset Comments
  const deleteComments = "DELETE FROM public.comments";

  await pgClient.query(deleteComments);

  const oneDay = 1000 * 60 * 60 * 24;
  const seededComments = [
    {
      msg: "Nice work on this!",
      time_created: Date.now(),
      user_id: "2da8b05c-c121-11ed-afa1-0242ac120002",
      ticket_id: "d74de750-c67e-11ed-afa1-0242ac120002",
      id: uuid.v1(),
    },
    {
      msg: "Is this in the scope for this release",
      time_created: Date.now() - oneDay,
      user_id: "3e0220fa-c121-11ed-afa1-0242ac120002",
      ticket_id: "d74de750-c67e-11ed-afa1-0242ac120002",
      id: uuid.v1(),
    },
    {
      msg: "Do we need this for this release?",
      time_created: Date.now() - 2 * oneDay,
      user_id: "4b549e0e-c121-11ed-afa1-0242ac120002",
      ticket_id: "d74de750-c67e-11ed-afa1-0242ac120002",
      id: uuid.v1(),
    },
    {
      msg: "Kicked out of current sprint due to escalations",
      time_created: Date.now() - 3 * oneDay,
      user_id: "2da8b05c-c121-11ed-afa1-0242ac120002",
      ticket_id: "d74de750-c67e-11ed-afa1-0242ac120002",
      id: uuid.v1(),
    },
    {
      msg: "Nice work on this Monica!",
      time_created: Date.now() - 4 * oneDay,
      user_id: "3e0220fa-c121-11ed-afa1-0242ac120002",
      ticket_id: "d74de750-c67e-11ed-afa1-0242ac120002",
      id: uuid.v1(),
    },
    {
      msg: "Users can change information on the ticket such as the title, description, or any of the attributes on the right side",
      time_created: Date.now() - 5 * oneDay,
      user_id: "4b549e0e-c121-11ed-afa1-0242ac120002",
      ticket_id: "d74de750-c67e-11ed-afa1-0242ac120002",
      id: uuid.v1(),
    },
  ];

  const CREATE_COMMENT = `INSERT INTO public.comments VALUES ($1,$2,$3,$4,$5)`;
  seededComments.forEach(async (comment) => {
    const res = await pgClient.query(CREATE_COMMENT, [
      comment.msg,
      comment.time_created,
      comment.user_id,
      comment.id,
      comment.ticket_id,
    ]);
  });

  //Reset Settings
  const deleteSettings = "DELETE FROM public.settings";

  await pgClient.query(deleteSettings);

  const CREATE_SETTING = `INSERT INTO public.settings VALUES ($1,$2)`;
  [
    { setting_name: "projectName", setting_value: "Central Park Project" },
    { setting_name: "projectDescription", setting_value: "test description" },
  ].forEach(async (setting) => {
    const res = await pgClient.query(CREATE_SETTING, [
      setting.setting_name,
      setting.setting_value,
    ]);
  });
};

module.exports = {
  deleteAllDatabaseRowsAndInsertSeededData,
};
