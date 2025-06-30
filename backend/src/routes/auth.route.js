import express from "express";
import { signup, login, logout , onboard } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);                                            
router.post("/logout", logout); 

router.post("/onboarding", protectRoute, onboard);

// protectRoute is giving me user with the help of jwt token having payload as userId
// check if user is logged in or not
// if user is logged in then we can access the user data from req.user
router.get("/me", protectRoute, (req, res) => 
{

   res.status(200).json({ success: true, user: req.user });

});

export default router;

