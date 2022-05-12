const express = require("express");
const router = express.Router();
const vendorService = require("../services/vendor.service");
const auth = require("../lib/auth")();
const verifyRoles = require("../lib/verifyRoles");

//Middleware
const { authenticate } = auth;
const verify = verifyRoles("vendor");

//Routes
router.post("/login", handleLogin);
router.post("/register", authenticate(), verify, registerVendor);
router.get("/appointment", authenticate(), verify, getAllAppointments);
router.get("/appointment/:id", authenticate(), verify, getAppointmentById);
router.post(
  "/appointment/:id/confirm",
  auth.authenticate(),
  verify,
  confirmAppointment
);
router.post(
  "/appointment/:id/reject",
  authenticate(),
  verify,
  rejectAppointment
);

//Function

async function registerVendor(req, res) {
  try {
    const vendor = await vendorService.registerVendor(req.body);
    res.json(vendor);
  } catch (err) {
    res.status(500).send({ message: "Error registering vendor" });
  }
}

async function handleLogin(req, res) {
  const { username, password } = req.body;
  try {
    const token = await vendorService.handleLogin(username, password);
    res.status(201).json(token);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function getAllAppointments(req, res) {
  try {
    const appointments = await vendorService.getAllAppointments(req.user._id);
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getAppointmentById(req, res) {
  try {
    const appointment = await vendorService.getAppointmentById(req.params.id);
    res.send(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function confirmAppointment(req, res) {
  try {
    const appointment = await vendorService.confirmAppointment(
      req.params.id,
      req.body
    );
    res.send(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function rejectAppointment(req, res) {
  try {
    const appointment = await vendorService.rejectAppointment(
      req.params.id,
      req.body
    );
    res.send(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
module.exports = router;
