function verifyRoles(roles) {
  return (req, res, next) => {
    if (roles === req.user.type) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
}

module.exports = verifyRoles;
