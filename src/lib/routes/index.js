const actuatorRoutes = require('./actuators');

const viewAccountDetailsRoute = require('./get_account_details');
const viewDebtsOnAccountRoute = require('./get_debts_for_account');
const viewOneDebtOnAccountRoute = require('./get_one_debt_from_account');

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
  viewDebtsOnAccountRoute(server);
  viewOneDebtOnAccountRoute(server);
  return server;
};
