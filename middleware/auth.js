const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

module.exports.privateRoute = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'This route is private. Please, provide the token' });
  }

  const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!isValid) {
    return res.status(401).json({ msg: 'Your token is not valid!' });
  }

  const { id: accountId, isAdmin, profileId } = jwt.decode(token);

  req.accountId = accountId;
  req.profileId = profileId;
  req.isUserAdmin = isAdmin;

  next();
};

module.exports.adminRoute = (req, res, next) => {
  if (!req.isUserAdmin) {
    return res.status(401).json({ msg: 'You are not authorized' });
  }

  next();
};
