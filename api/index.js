const { app } = require("./server");
const { MiddlewareApplication } = require("./middlewares/middleware");

const PORT = process.env.PORT || 8000;
MiddlewareApplication(app);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

