import { Router } from "express";
import { signup ,signin, google, signout} from "../controllers/Aut.contoroler.js";

const router= Router();

// router.post('/singup',singup)
router.post("/signup", signup); // ⬅️ waa inuu jiro
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signout)


export default router;