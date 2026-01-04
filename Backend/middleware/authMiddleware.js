const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }
  const token1 = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
