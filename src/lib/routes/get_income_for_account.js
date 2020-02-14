const debtor = require('../debtor')();
const errors = require('restify-errors');

const findIncomeForAccount = async (req, res, next) => {
  try {
    const income = await debtor.getIncomeForAccount(req.params['accountId']);
    res.locals.income = income;
    next();
  } catch (e) {
    if (e.message.match(/not found/)) {
      next(new errors.NotFoundError(`Account of ID ${req.params['accountId']} could not be found`));
    } else {
      next(new errors.InternalServerError(e.message));
    }
  }
};

const renderResponse = (req, res, next) => {
  res.contentType = 'application/json';
  res.header('content-type', 'application/json');
  res.send(200, res.locals.income);
  next();
};

module.exports = (server) => {
  server.get('/accounts/:accountId/income', findIncomeForAccount, renderResponse);
};
