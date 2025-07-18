const app = require("./server");
const { PORT } = process.env;
const { MiddlewareApplication } = require("./middlewares/middleware");

MiddlewareApplication(app);
app.listen(PORT || 8000, () => {
  console.log(`Server running on port ${PORT}`);
});
