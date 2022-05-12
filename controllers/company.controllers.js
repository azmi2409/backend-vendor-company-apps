const express = require("express");
const router = express.Router();
const companyService = require("../services/company.service");
const auth = require("../lib/auth")();
const verifyRoles = require("../lib/verifyRoles");

//Middleware
const { authenticate } = auth;
const verify = verifyRoles("company");

//Routes
router.post("/login", handleLogin);
router.post("/register", registerCompany);
router.post("/appointment", authenticate(), verify, createAppointment);
router.get("/vendor", authenticate(), verify, getAllVendors);
router.get("/appointment", authenticate(), verify, getAllAppointments);
router.get("/appointment/:id", authenticate(), verify, getAppointmentById);

//GET: all appointments by companyID
async function getAllAppointments(req, res) {
  try {
    const appointments = await companyService.getAllAppointments(req.user._id);
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//GET: specific appointment
async function getAppointmentById(req, res) {
  try {
    const appointment = await companyService.getAppointmentById(req.params.id);
    res.send(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Register a company
async function registerCompany(req, res) {
  try {
    const company = await companyService.registerCompany(req.body);
    res.json(company);
  } catch (err) {
    res.status(500).send({ message: "Error registering company" });
  }
}

//Handle the Login
async function handleLogin(req, res) {
  const { username, password } = req.body;
  try {
    const token = await companyService.handleLogin(username, password);
    res.status(201).json(token);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

//Create an appointment
async function createAppointment(req, res) {
  try {
    const appointment = await companyService.createAppointment(
      req.user,
      req.body
    );
    res.json(appointment);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

//Get all events name and vendor id
async function getAllVendors(req, res) {
  try {
    const vendors = await companyService.getAllVendors();
    res.send(vendors);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = router;
