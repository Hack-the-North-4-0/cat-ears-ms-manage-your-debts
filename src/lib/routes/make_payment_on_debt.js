const debtor = require('../debtor')();
const errors = require('restify-errors');

const findAccount = async (req, res, next) => {
  try {
    const account = await debtor.getOneAccountDetails(req.params['accountId']);
    res.locals.account = account;
    next();
  } catch (e) {
    if (e.message.match(/not found/)) {
      next(new errors.NotFoundError(`Account of ID ${req.params['accountId']} could not be found`));
    } else {
      next(new errors.InternalServerError(e.message));
    }
  }
};

const findDebt = async (req, res, next) => {
  try {
    const debt = await debtor.getOneDebtFromAccount(req.params['accountId'], req.params['debtId']);
    res.locals.debt = debt;
    next();
  } catch (e) {
    if (e.message.match(/not found/)) {
      next(new errors.NotFoundError(`Account of ID ${req.params['accountId']} with debt ${req.params['debtId']} could not be found`));
    } else {
      next(new errors.InternalServerError(e.message));
    }
  }
};

const attemptPayment = async (req, res, next) => {
  const remainingFunds = res.locals.account.liquid_assets - req.body['payment_amount'];
  const remainingDebt = res.locals.debt.remaining - req.body['payment_amount'];
  if (remainingFunds < 0) {
    next(new errors.BadRequestError(`Maximum amount that the account can pay is ${res.locals.account.liquid_assets}`));
  } else if (remainingDebt < 0) {
    next(new errors.BadRequestError(`Maximum amount that can be paid on this debt is ${res.locals.debt.remaining}`));
  } else {
    await debtor.makePaymentOnDebt(req.params['accountId'], req.params['debtId'], req.body['payment_amount']);
    next();
  }
};

const renderResponse = (req, res, next) => {
  res.contentType = 'application/json';
  res.header('content-type', 'application/json');
  res.send(200, res.locals.payments);
  next();
};

module.exports = (server) => {
  server.post('/accounts/:accountId/debts/:debtId/payments', findAccount, findDebt, attemptPayment, renderResponse);
};
