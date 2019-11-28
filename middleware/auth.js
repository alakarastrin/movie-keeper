const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

module.exports.privateRoute = (req, res, next) => {
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

  const { id: accountId } = jwt.decode(token);

  req.accountId = accountId;

  next();
};

module.exports.adminRoute = async (req, res, next) => {
  const user = await Account.findById(req.accountId);

  if (!user) {
    return res.status(401).json({ msg: 'Your id is not valid' });
  }

  if (!user.isAdmin) {
    return res.status(401).json({ msg: 'You are not authorized' });
  }

  next();
};
