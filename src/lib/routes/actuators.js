const renderResponse = (req, res, next) => {
  res.contentType = 'application/json';
  res.header('content-type', 'application/json');
  res.send(200, { greeting: 'Hello world!' });
  next();
};

module.exports = (server) => {
  server.get('/actuators/health', renderResponse);
};
