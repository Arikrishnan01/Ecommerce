import express from "express";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import {
  braintreePayment,
  braintreeToken,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductPhoto,
  getSingleProduct,
  productsCategory,
  productsCount,
  productsFilter,
  productsList,
  productsRelated,
  productsSearch,
  updateProduct,
} from "../Controllers/productcontroller.js";
import formidable from "express-formidable";

/**assign the sub router */
const router = express.Router();

/**create new product */
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
);

/**update product */
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

/**get all produtcs  */
router.get("/getAll-products", getAllProducts);

/** get single product */
router.get("/getSingle-product/:slug", getSingleProduct);

/**get product photo */
router.get("/product-photo/:pid", getProductPhoto);

/**delete product  */
router.delete("/delete-product/:pid", deleteProduct);

/**products filters */
router.post("/product-filter", productsFilter);

/**products count */
router.get("/product-count", productsCount);

/** get product list */
router.get("/product-list/:page", productsList);

/** product search */
router.get("/product-search/:keyword", productsSearch);

/**related product */
router.get('/related-product/:pid/:cid', productsRelated);

/** category wise products  */
router.get("/product-category/:slug", productsCategory);

/** payment gateway */
router.get('/braintree/token', braintreeToken);


/** payments */
router.post("/braintree/payment", requireSignIn, braintreePayment);

/**export the sub routers */
const productsRouter = router;
export default productsRouter;
