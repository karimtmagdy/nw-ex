const RouterApplication = (app) => {
  const api = "/api/v1";
  app.use(`${api}/chats`, require("./chat.routes"));
  // app.use(`${api}`,require('./user'));
    // app.use(`${api}/auth`, require("./"));
  // app.use(`${api}/categories`, require("./"));
  // app.use(`${api}/users`, require("./"));
  // app.use(`${api}/brands`, require("./"));
  // app.use(`${api}/products`, require("./"));
  // app.use(`${api}/subcategories`, require("./"));
  // app.use(`${api}/s`, require("./"));
};

module.exports = { RouterApplication };
