const RouterApplication = (app) => {
  const api = "/api/v1";
  app.use(`${api}/chats`, require("./chat.routes"));
  app.use(`${api}/auth`, require("./auth.routes"));
  app.use(`${api}/categories`, require("./category.routes"));
  app.use(`${api}/users`, require("./user.routes"));
  app.use(`${api}/brands`, require("./brand.routes"));
  app.use(`${api}/products`, require("./product.routes"));
  app.use(`${api}/subcategories`, require("./subcategory.routes"));
  // app.use(`${api}`,require('./user'));
  // app.use(`${api}/orders`, require("./order.routes"));
  // app.use(`${api}/s`, require("./"));
};
module.exports = { RouterApplication };
