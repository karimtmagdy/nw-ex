import {
  addItemToCart,
  createCart,
  getActiveCart,
} from "../services/cart.service";
import { Router } from "express";
import { authorize } from "../middleware/is-verify";

const router = Router();
router.use(authorize);
router.route("/").post(createCart).get(getActiveCart);
router.route("/items").post(addItemToCart);

export { router as cartRouter };
