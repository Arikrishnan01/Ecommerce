import express from 'express';
import { 
    isAdmin, 
    requireSignIn 
} from '../Middlewares/authMiddleware.js';
import { 
    createCategory, 
    deleteCategory, 
    getAllCategory, 
    getBySingleCategory, 
    updateCategory 
} from '../Controllers/categoryController.js';

/** create sub router */
const router = express.Router();

/**create category */
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategory
);

/**update category sub router */
router.put(
    '/update-category/:id',
     requireSignIn, 
     isAdmin, 
     updateCategory
);

/**get all category sub router */
router.get(
    "/getAll-category",
    getAllCategory
);

/** get single category */
router.get(
    "/getSingle-category/:slug",
    getBySingleCategory
);

/**delete single category */
router.delete(
    '/delete-category/:id',
    requireSignIn,
    isAdmin,
    deleteCategory
);

/** export the sub routers */
const adminPanel = router;
export default adminPanel;