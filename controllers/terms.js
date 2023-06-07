const { Terms, Users } = require("../models");
const { findAll, save, findByData, findById } = require("../helpers");
const moment = require("moment");

exports.showAll = async (req, res) => {
  const query = req.query;
  try {
    const result = await findAll({
      model: Terms,
      query: {
        user_uuid: null,
      },
      allowedFilters: ["user_uuid"],
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

exports.showFree = async (req, res) => {
  const result = await findAll({
    model: Terms,
    query: {
      status: 1,
    },
    allowedFilters: ["status"],
    compartmentFilters: [
      {
        minValue: moment().format("yyyy-MM-DD"),
        maxValue: moment().add(2, "weeks").format("yyyy-MM-DD"),
        key: "date",
      },
    ],
  });

  res.json({
    status: "success",
    data: result,
  });
};

const leaveTerm = async ({ id }) => {
  const existingTerm = await findById({ model: Terms, id });

  // create duplicate
  save({
    model: Terms,
    data: {
      ...existingTerm,
      user_uuid: null,
      status: 1,
      id: undefined,
    },
  });

  // change existing term
  save({
    model: Terms,
    data: {
      ...existingTerm,
      leave_date: moment().format("yyyy-MM-DD"),
      leave_time: moment().format("HH:mm"),
      status: 3,
    },
  });

  return true;
};

const reserveTerm = async ({ id, user_uuid }) => {
  const existingTerm = await findById({ model: Terms, id });
  console.log({ existingTerm });

  const reservedTerm = await findAll({
    model: Terms,
    query: {
      user_uuid,
      status: 2,
    },
    allowedFilters: ["status", "user_uuid"],
    compartmentFilters: [
      {
        minValue: moment().format("yyyy-MM-DD"),
        maxValue: moment().add(2, "weeks").format("yyyy-MM-DD"),
        key: "date",
      },
    ],
  });

  console.log({ reservedTerm });

  if (reservedTerm.results.length) {
    leaveTerm({ id: reservedTerm.results[0].id });
  }

  save({
    model: Terms,
    data: {
      ...existingTerm,
      user_uuid,
      status: 2,
    },
  });

  return true;
};

exports.save = async (req, res) => {
  try {
    const user = await findByData({
      model: Users,
      data: { uuid: req.body.user_uuid },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: `Nie udało się zapisać terminu. ErrorMessage: ${error}`,
    });
  }
};

exports.leave = async (req, res) => {
  try {
    await leaveTerm({ id: req.body.event_id });

    res.json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: `Nie udało się zapisać terminu. ErrorMessage: ${error}`,
    });
  }
};

exports.checkReservation = async (req, res) => {
  const terms = await findAll({
    model: Terms,
    query: {},
  });

  const result = await findAll({
    model: Terms,
    query: {
      status: 2,
      user_uuid: req.body.user_uuid,
    },
    allowedFilters: ["status", "user_uuid"],
    compartmentFilters: [
      {
        minValue: moment().format("yyyy-MM-DD"),
        maxValue: moment().add(2, "weeks").format("yyyy-MM-DD"),
        key: "date",
      },
    ],
  });

  res.json({
    status: "success",
    data: result,
  });
};

exports.reserve = async (req, res) => {
  try {
    const { event_id, user_uuid } = req.body;
    await reserveTerm({ id: event_id, user_uuid });

    res.json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: `Nie udało się zarezerwować terminu. ErrorMessage: ${error}`,
    });
  }
};
