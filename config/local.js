module.exports = {
  app: {
    http2: {
      enabled: true,
      key: 'test/spec/helpers/certs/localhost-privkey.pem',
      cert: 'test/spec/helpers/certs/localhost-cert.pem',
    },
    name: 'ms-manage-your-debts',
    hostname: 'localhost',
    port: '8080',
    source: 'file',
  },
  functionality: {
  },
  logger: {
    level: 'info',
  },
};
