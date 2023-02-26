const { pgClient } = require("./postgres");

const getSettings = async () => {
  const GET_ALL_SETTINGS = "SELECT * FROM public.settings ";
  const result = await pgClient.query(GET_ALL_SETTINGS);
  return result;
};

const updateSetting = async (settingName, newValue) => {
  const UPDATE_SETTING = `UPDATE public.settings set setting_value=$1 where setting_name=$2`;
  const updateSettingResult = await pgClient.query(UPDATE_SETTING, [
    settingName,
    newValue,
  ]);
  return await getSettings();
};

module.exports = {
  getSettings,
  updateSetting,
};
