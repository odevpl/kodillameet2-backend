const { Weeks } = require("../models");
const { findAll, save } = require("../helpers");
const { DATE_FORMAT } = require('../constants');
const moment = require('moment');

exports.showAll = async (req, res) => {
  const query = req.query;
  try {
    const result = await findAll({
      model: Weeks,
      query,
    });

    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: `Nie udało się pobrać listy kontenerów. ErrorMessage: ${error}`,
    });
  }
};

exports.addWeek = async (req, res) => {
  const query = req.query;

  try {
    const weeks = await findAll({
      model: Weeks,
      query
    });

    const lastWeek = weeks.results[weeks.results.length - 1].last_week_date;
    const first_week_date = moment(lastWeek).add(1, "days").format(DATE_FORMAT);
    const last_week_date = moment(lastWeek).add(7, "days").format(DATE_FORMAT);

    await save({
      model: Weeks,
      data: {
        first_week_date,
        last_week_date,
        is_active: 1
      }
    });

    res.json({
      status: "success",
      data: "Nowy tydzień został dodany pomyślnie."
    });
  } catch(error) {
    res.json({
      status: "error",
      message: "Nie udało się dodać kolejnego tygodnia. ErrorMessage: " + error,
    });
  };
}
;