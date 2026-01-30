import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router=express.Router();

router.post("/signup",signup);//each func takes 50 lines we put logic in controllers
//post bcz we are sending data to server 
router.post("/login",login);
router.post("/logout",logout);
router.post("/onboarding",protectRoute, onboard);

//check if user is logged in                              
router.get("/me",protectRoute, (req,res)=>{
    res.status(200).json({success:true,user:req.user});
});



export default router;
