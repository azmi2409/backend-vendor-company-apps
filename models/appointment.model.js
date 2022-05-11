const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date_created: {
    type: Date,
    default: Date.now,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
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
