const debtor = require('../debtor')();
const errors = require('restify-errors');

const findInterestOnDebt = async (req, res, next) => {
  try {
    const interest = await debtor.getInterestPaidOnDebt(req.params['accountId'], req.params['debtId']);
    res.locals.interest = interest;
    next();
  } catch (e) {
    if (e.message.match(/not found/)) {
      next(new errors.NotFoundError(`Account of ID ${req.params['accountId']} with debt ${req.params['debtId']} could not be found`));
    } else {
      next(new errors.InternalServerError(e.message));
    }
  }
};

const renderResponse = (req, res, next) => {
  res.contentType = 'application/json';
  res.header('content-type', 'application/json');
  res.send(200, res.locals.interest);
  next();
};

module.exports = (server) => {
  server.get('/accounts/:accountId/debts/:debtId/interest', findInterestOnDebt, renderResponse);
};
