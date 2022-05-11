const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const companySchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    default: "company",
  },
});

companySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Company", companySchema);
