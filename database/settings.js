const { pgClient } = require("./postgres");

const getSettings = async () => {
  const GET_ALL_SETTINGS = "SELECT * FROM public.settings ";
  const result = await pgClient.query(GET_ALL_SETTINGS);
  return result;
};

const updateSettingById = async (settingId, body) => {
  var query = ["UPDATE public.settings"];
  query.push("SET");

  var set = [];
  Object.keys(body).forEach((key, i) => {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));

  query.push("WHERE setting_name = " + "'" + settingId + "'");

  const colValues = Object.keys(body).map((key) => {
    return body[key];
  });

  const UPDATE_SETTINGS = query.join(" ");

  // console.log(settingId);
  // console.log(body);
  // console.log(UPDATE_SETTINGS);
  // console.log(colValues);

  await pgClient.query(UPDATE_SETTINGS, colValues);
};

module.exports = {
  getSettings,
  updateSettingById,
};
