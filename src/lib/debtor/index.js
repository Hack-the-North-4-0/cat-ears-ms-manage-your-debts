const config = require('config');

// const postgresDebtor = require('../../js/debtor/postgres_debtor').PostgresDebtor;
const memoryDebtor = require('../../js/debtor/memory_debtor').MemoryDebtor;
const logger = require('../logger').bunyanLogger();

let debtor;

const resolveDebtor = () => {
  let debtoree;
  if (config.get('app.source') === 'postgres') {
    logger.info('Hosting debts with Postgres');
    // debtoree = postgresDebtor.prototype;
  } else if (config.get('app.source') === 'memory') {
    logger.info('Hosting debts in memory');
    debtoree = new memoryDebtor();
  } else {
    logger.warn('Unable to host debts. Hosting in memory.');
    debtoree = new memoryDebtor();
  }
  return debtoree;
};

module.exports = () => {
  if (debtor === undefined) {
    debtor = resolveDebtor();
  }
  return debtor;
};
