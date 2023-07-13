const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    if (blacklist.includes(token)) {
      res.json({ msg: "Please Login again!!" });
    }
    try {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        next();
      } else {
        res.status(400).json({ msg: "Token not recognised" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    res.json({ msg: "please Login!!" });
  }
};

module.exports = {
  auth,
};
