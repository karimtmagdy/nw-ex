import { Express } from "express";
import { authRouter } from "./auth.routes";
import { userRouter } from "./user.routes";
import { chatRouter } from "./chat.routes";
import { brandRouter } from "./brand.routes";
import { cartRouter } from "./cart.routes";
import { productRouter } from "./product.routes";
import { categoryRouter } from "./category.routes";
import { subcategoryRouter } from "./subcategory.routes";

import { uploadRouter } from "./upload.routes";
export const RouterApplication = (app: Express) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/chats", chatRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);
  app.use("/api/v1/uploads", uploadRouter);
  app.use("/api/v1/users", userRouter);
  // app.use("/api/v1/subofsubcategories", brandRouter);
};
