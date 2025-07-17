const RouterApplication = (app) => {
  const api = "/api/v1";
  app.use(`${api}/chats`, require("./chat.routes"));
  // app.use('/api',require('./user'));
};

module.exports = { RouterApplication };
