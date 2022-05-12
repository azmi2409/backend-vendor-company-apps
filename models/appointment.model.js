const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date_created: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      username: String,
    },
    required: true,
  },
  vendor: {
    type: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
      username: String,
    },
    required: true,
  },
  proposed_date: {
    type: [
      {
        type: Date,
        required: true,
      },
    ],
    validate: [arrayLimit, "3 dates required"],
  },
  proposed_location: {
    type: String,
    required: true,
  },
  event_name: {
    type: String,
    required: true,
    ref: "Vendor",
  },
  status: {
    type: String,
    default: "pending",
  },
  remarks: {
    type: String,
    default: "",
  },
  confirmed_date: {
    type: Date,
    default: null,
  },
});

function arrayLimit(val) {
  return val.length === 3;
}

module.exports = mongoose.model("Appointment", appointmentSchema);
