const mongoose = require("../lib/db");
const bcrypt = require("bcrypt");
const model = require("../models/");
const vendorModel = model.vendor;
const appointmentModel = model.appointment;
const jwt = require("jwt-simple");
const config = require("../lib/config");

//Temp Register a vendor
async function registerVendor(vendor) {
  const salt = await bcrypt.genSalt(10);
  vendor.password = await bcrypt.hash(vendor.password, salt);
  const newVendor = new vendorModel(vendor);
  try {
    const savedVendor = await newVendor.save();
    return savedVendor;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Function to handle the Login
async function handleLogin(username, passport) {
  const vendor = await vendorModel.findOne({ username: username });
  if (vendor) {
    const isPasswordValid = await bcrypt.compare(passport, vendor.password);
    if (isPasswordValid) {
      const payload = {
        id: vendor._id,
        name: vendor.username,
        type: vendor.type,
        expired: Date.now() + config.jwtExpiration,
      };
      const token = jwt.encode(payload, config.jwtSecret);
      return { token };
    } else {
      throw new Error("Invalid Password");
    }
  } else {
    throw new Error("Invalid Username");
  }
}

//Get all the appointments
async function getAllAppointments() {
  const appointments = await mongoose.model("Appointment").find();
  return appointments;
}

//Get specific appointment
async function getAppointmentById(id) {
  const appointment = await mongoose.model("Appointment").findById(id);
  return appointment;
}

//Create an appointment
async function createAppointment(appointment) {
  const newAppointment = new appointmentModel(appointment);
  try {
    const savedAppointment = await newAppointment.save();
    return savedAppointment;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerVendor,
  handleLogin,
  getAllAppointments,
  getAppointmentById,
  createAppointment,
};
