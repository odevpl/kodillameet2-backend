const { Users } = require("../models");
const { findAll, findByData, save } = require("../helpers");

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

exports.addUser = async (req, res) => {
  
  try {
    await save({
      model: Users,
      data: req.body
    });

    res.json({
      status: "success",
      message: "User has been added"
    });
  } catch(error) {
    res.json({
      status: "error",
      message: `Nie udało się dodać użytkownika. ErrorMessage: ${error}`
    });
  };
}
