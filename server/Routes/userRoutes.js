import express from "express";
import {forgetPassword, getAllOrders, getOrders, login, ordersStatus, profileUpdate, register, test}  from '../Controllers/userController.js';
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

/** CRAETE SU ROUTES HERE */
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/test",[requireSignIn],[isAdmin] , test);

/**forget password router */
router.post('/forget-password', forgetPassword);

/**user auth router */
router.get('/user-auth', requireSignIn,(req, res) => {
    return res.status(200).json({
        ok: true
    });
})

/**admin auth */
router.get('/admin-auth', requireSignIn,isAdmin,(req, res) => {
    return res.status(200).json({
        ok: true
    });
})

/** update profile */
router.put("/profile", requireSignIn, profileUpdate);

/** orders */
router.get("/orders", requireSignIn, getOrders);

/** orders */
router.get("/all-orders", requireSignIn,isAdmin, getAllOrders);

/** orders */
router.put("/order-status/:orderId", requireSignIn,isAdmin, ordersStatus);

/** EXPORT THE ROUTES */
const userRoutes = router;
export default userRoutes;