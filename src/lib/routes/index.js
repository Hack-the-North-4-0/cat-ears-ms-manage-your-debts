const actuatorRoutes = require('./actuators');

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
  return server;
};
