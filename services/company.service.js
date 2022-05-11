const mongoose = require("../lib/db");
const bcrypt = require("bcrypt");
const model = require("../models/");
const jwt = require("jwt-simple");
const config = require("../lib/config");

//All Models
const companyModel = model.company;
const appointmentModel = model.appointment;
const vendorModel = model.vendor;

//Temp Register a company
async function registerCompany(company) {
  const salt = await bcrypt.genSalt(10);
  company.password = await bcrypt.hash(company.password, salt);
  const newCompany = new companyModel(company);
  try {
    const savedCompany = await newCompany.save();
    return savedCompany;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Function to handle the Login
async function handleLogin(username, passport) {
  const company = await companyModel.findOne({ username: username });
  if (company) {
    const isPasswordValid = await bcrypt.compare(passport, company.password);
    if (isPasswordValid) {
      const payload = {
        id: company._id,
        username: company.username,
        type: company.type,
        expired: Date.now() + config.jwtExpiration,
      };
      const token = jwt.encode(payload, config.jwtSecret);
      //set last_login
      company.last_login = Date.now();
      await company.save();
      return { token, username: company.username, type: company.type };
    } else {
      throw new Error("Invalid Password");
    }
  } else {
    throw new Error("Invalid Username");
  }
}

//Get all the appointments by company id
async function getAllAppointments(companyId) {
  const appointments = await appointmentModel.find({ company_id: companyId });
  return appointments;
}

//Get specific appointment
async function getAppointmentById(id) {
  const appointment = await mongoose.model("Appointment").findById(id);
  return appointment;
}

//Create an appointment
async function createAppointment(userid, appointment) {
  const newAppointment = new appointmentModel(appointment);
  newAppointment.company_id = userid;
  try {
    const savedAppointment = await newAppointment.save();
    return savedAppointment;
  } catch (error) {
    throw error;
  }
}

async function getAllVendors() {
  const vendors = await vendorModel.find(null, "event_name");
  return vendors;
}

module.exports = {
  registerCompany,
  handleLogin,
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  getAllVendors,
};
