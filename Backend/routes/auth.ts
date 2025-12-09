import { Router } from "express";

import { signup, login } from "../controllers/authController";
// import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// router.use(authMiddleware);

router.post("/signup",  signup);
router.post("/login",  login);


export default router;

