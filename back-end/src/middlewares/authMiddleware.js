const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  // console.log(token, process.env.JWT_SECRET);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ error: "Failed to authenticate token" });
      } else {
        req.userId = decoded.userid;
        next();
      }
    });
  } else {
    return res.status(403).json({ error: "No token provided" });
  }
};

module.exports = authMiddleware;
