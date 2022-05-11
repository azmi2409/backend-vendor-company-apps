const express = require("express");
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("passport-local");
const company = require("./models/company.model");
const auth = require("./lib/auth")();

const companyRouter = require("./controllers/company.controllers");
const vendorRouter = require("./controllers/vendor.controllers");

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//init passport
passport.use(new localStrategy(company.authenticate()));
app.use(passport.initialize());
passport.serializeUser(company.serializeUser());
passport.deserializeUser(company.deserializeUser());

app.use("/company", companyRouter);
app.use("/vendor", vendorRouter);

// catch 404 and forward to error handle

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => console.log("Server listening on port " + port));
