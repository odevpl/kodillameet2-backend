const { Weeks } = require("../models");
const { findAll } = require("../helpers");

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
