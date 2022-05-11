const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.company = require("./company.model");
db.vendor = require("./vendor.model");
db.appointment = require("./appointment.model");

module.exports = db;
