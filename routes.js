// IMPORTANT
// Suggested names for endpoints: /name/:id/name2/:id2
// Suggested names for controllers: showOne, showAll, remove, save
// save controller is use like update. If body dont have id "save" create new element
// in DB, if "save" have id, element with this id is updated

const express = require("express");
const router = express.Router();

const authPost = (endpoint, action) => {
  router.post(endpoint, action);
};
const authGet = (endpoint, action) => {
  router.get(endpoint, action);
};

const TermsController = require("./controllers/terms");
authGet("/terms/", TermsController.showAll);
authGet("/terms/free", TermsController.showFree);
authPost("/term/reserve", TermsController.reserve);
authPost("/term/check_reservation", TermsController.checkReservation);
authPost("/term/leave", TermsController.leave);

authPost("/term", TermsController.save);

// authPost("/term/:id/remove", TermsController.remove);

const UsersController = require("./controllers/users");
authGet("/users/", UsersController.showAll);
authGet("/user/:uuid", UsersController.showOne);
authPost("/user/", UsersController.addUser);

// authPost("/user", UsersController.save);

const WeeksController = require("./controllers/weeks");
authGet("/weeks/", WeeksController.showAll);
authPost("/week/", WeeksController.addWeek);

const InformationsController = require("./controllers/informations");
authGet("/information", InformationsController.showOne);
authPost("/information", InformationsController.save);

// Example for Holidays
// const HolidaysController = require("./controllers/holidays");
// authGet("/holidays", HolidaysController.showAll);
// authGet("/holiday/:id", HolidaysController.showOne);
// authPost("/holiday/", HolidaysController.save);
// authPost("/holiday/:id/remove", HolidaysController.remove);

module.exports = router;
