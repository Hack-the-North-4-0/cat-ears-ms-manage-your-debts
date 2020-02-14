const debtor = require('../debtor')();
const errors = require('restify-errors');

const submitDebt = async (req, res, next) => {
  res.locals.account = await debtor.pushNewDebt(req.params['accountId'], req.body);
  next();
};

const renderResponse = (req, res, next) => {
  res.contentType = 'application/json';
  res.header('content-type', 'application/json');
  res.send(200, res.locals.account);
  next();
};

module.exports = (server) => {
  server.post('/admin/accounts/:accountId/debts', submitDebt, renderResponse);
};
