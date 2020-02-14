const actuatorRoutes = require('./actuators');

const viewAccountDetailsRoute = require('./get_account_details');
const viewIncomeForAccountRotue = require('./get_income_for_account');
const viewDebtsOnAccountRoute = require('./get_debts_for_account');
const viewOneDebtOnAccountRoute = require('./get_one_debt_from_account');
const viewPaymentsOnDebtRoute = require('./get_payments_made_on_debt');
const viewInterestOnDebtRoute = require('./get_interest_made_on_debt');

const makePaymentOnDebt = require('./make_payment_on_debt');

/*
G /accounts/:accountId/debts -- View all debts associated with a person
G /accounts/:accountId/payments -- View the payment history of a person
G /accounts/:accountId/income -- View income history for an account
Po /accounts/:accountId/income -- Schedule income for an account

G /debts/:debtId -- View one debt
Po /debts/:debtId -- Pay one debt
 */

module.exports = (server) => {
  actuatorRoutes(server);

  viewAccountDetailsRoute(server);
  viewIncomeForAccountRotue(server);
  viewDebtsOnAccountRoute(server);
  viewOneDebtOnAccountRoute(server);
  viewPaymentsOnDebtRoute(server);
  viewInterestOnDebtRoute(server);

  makePaymentOnDebt(server);
  return server;
};
