const homepageRoutes = require('./homepage');

module.exports = (server) => {
  homepageRoutes(server);
  return server;
};
