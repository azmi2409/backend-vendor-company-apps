const express = require("express");
const router = express.Router();
const vendorService = require("../services/vendor.service");
const auth = require("../lib/auth")();

//Routes

router.post("/login", handleLogin);
router.get("/", auth.authenticate(), getAllVendors);
router.post("/register", auth.authenticate(), registerVendor);

//Function

function getAllVendors(req, res) {
  res.send("Vendors");
}

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
module.exports = router;
