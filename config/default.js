module.exports = {
  app: {
    http2: {
      enabled: false,
      key: '/path/to/key/file',
      cert: '/path/to/cert/file',
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
