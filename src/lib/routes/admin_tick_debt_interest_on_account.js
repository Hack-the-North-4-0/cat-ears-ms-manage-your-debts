const debtor = require('../debtor')();
const errors = require('restify-errors');

const findDebt = async (req, res, next) => {
  try {
    const debt = await debtor.getDebtFromAccount(req.params['accountId'], req.params['debtId']);
    res.locals.debt = debt;
    next();
  } catch (e) {
    if (e.message.match(/not found/)) {
      next(new errors.NotFoundError(`Account of ID ${req.params['accountId']} could not be found`));
    } else {
      next(new errors.InternalServerError(e.message));
    }
  }
};

const tickInterest = async (req, res, next) => {
  await debtor.tickInterest(req.params['accountId'], req.params['debtId']);
  next();
};

const renderResponse = (req, res, next) => {
  res.contentType = 'application/json';
  res.header('content-type', 'application/json');
  res.send(200, res.locals.debt);
  next();
};

module.exports = (server) => {
  server.post('/admin/accounts/:accountId/debts/:debtId/interest/tick', findDebt, tickInterest, renderResponse);
};
