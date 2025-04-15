const jwt = require("jsonwebtoken");

const validateJWTToken = (req, res, next) => {
  try {
    // const token = req?.headers?.authorization?.split(" ")[1];
    // const decode = jwt.verify(token, process.env.SECRET_KEY);

    // req.body = {
    //   email: decode?.email,
    //   userId: decode?.userId,
    // };
    // next();

    const token = req.cookies.access_token;

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.body = {
      email: decodedToken?.email,
      userId: decodedToken?.userId,
      data: { ...req.body },
    };

    next();
  } catch (e) {
    res.status(401);
    next(e);
  }
};

module.exports = {
  validateJWTToken,
};
