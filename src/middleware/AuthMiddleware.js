const jwt = require("jsonwebtoken");
const secret = "samir";

const validateUser = (req, res, next) => {
  var token = req.headers.authorization;
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      try {
        const user = jwt.verify(token, secret);
        next();
      } catch (err) {
        // console.log(err);
        res.status(401).json({
          message: "Unauthorized, Token is invalid",
        });
      }
    } else {
      res.status(401).json({
        message: "Unauthorized, Token should be Bearer token",
      });
    }
  } else {
    res.status(401).json({
      message: "Unauthorized,Please provide token in header",
    });
  }
};

module.exports = {
  validateUser,
};
