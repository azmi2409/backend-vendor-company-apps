const passport = require("passport");
const companyModel = require("../models/company.model");
const vendorModel = require("../models/vendor.model");
const passportJWT = require("passport-jwt");
const config = require("../lib/config");
const extractJwt = passportJWT.ExtractJwt;
const jwtStrategy = passportJWT.Strategy;
const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken("jwt"),
};

module.exports = function () {
  const strategy = new jwtStrategy(params, (payload, done) => {
    //check user type
    let model = payload.type === "company" ? companyModel : vendorModel;
    const company = model.findById(payload.id, (err, company) => {
      if (err) {
        return done(new Error("user not found"), false);
      } else if (payload.expired <= Date.now()) {
        return done(new Error("token expired"), false);
      } else return done(null, company);
    });
  });
  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", config.jwtSession);
    },
  };
};
