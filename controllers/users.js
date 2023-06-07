const { Users } = require("../models");
const { findAll, findByData } = require("../helpers");

exports.showAll = async (req, res) => {
  const query = req.query;
  try {
    const result = await findAll({
      model: Users,
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

exports.showOne = async (req, res) => {
  const params = req.params;
  try {
    const result = await findByData({
      model: Users,
      data: {
        uuid: params.uuid,
      },
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
