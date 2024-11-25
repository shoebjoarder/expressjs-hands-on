SECRET = "secret-token";

const authentication = (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (token === SECRET) {
    next();
  } else {
    res.status(403).json({
      message: "Forbidden",
    });
  }
};

module.exports = authentication;
