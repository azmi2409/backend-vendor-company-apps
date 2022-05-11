const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const vendorSchema = new Schema({
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
  event_name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    default: "vendor",
  },
});

vendorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Vendor", vendorSchema);
