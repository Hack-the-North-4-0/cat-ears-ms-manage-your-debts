module.exports = {
  app: {
    http2: {
      enabled: false,
      key: 'test/spec/helpers/certs/localhost-privkey.pem',
      cert: 'test/spec/helpers/certs/localhost-cert.pem',
    },
    name: 'ms-manage-your-debts',
    hostname: 'localhost',
    port: '9090',
    source: 'file',
  },
  functionality: {
  },
  logger: {
    level: 'info',
  },
};
