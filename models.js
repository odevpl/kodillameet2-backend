const bookshelf = require("./config/bookshelf");

exports.Users = bookshelf.Model.extend({ tableName: "users" });
exports.Terms = bookshelf.Model.extend({ tableName: "terms" });
exports.Weeks = bookshelf.Model.extend({ tableName: "weeks" });
exports.Informations = bookshelf.Model.extend({ tableName: "informations" });
