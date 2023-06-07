const { Informations } = require("../models");
const { findById, save } = require("../helpers");

exports.showOne = async (req, res) => {
  try {
    const result = await findById({
      model: Informations,
      id: 1,
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

exports.save = async (req, res) => {
  try {
    await save({
      model: Informations,
      data: {
        ...req.body,
        id: 1,
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: `Nie udało się pobrać listy kontenerów. ErrorMessage: ${error}`,
    });
  }
};
