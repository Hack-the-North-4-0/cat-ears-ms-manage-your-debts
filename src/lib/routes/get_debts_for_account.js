const debtor = require('../debtor')();
const errors = require('restify-errors');

const findDebtsForAccount = async (req, res, next) => {
  try {
    const debts = await debtor.getDebtsForAccount(req.params['accountId']);
    res.locals.debts = debts;
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
  res.send(200, res.locals.debts);
  next();
};

module.exports = (server) => {
  server.get('/accounts/:accountId/debts', findDebtsForAccount, renderResponse);
};
