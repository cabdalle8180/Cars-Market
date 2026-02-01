import { Router, } from "express";
import { createListing, deletelisting, updatelisting,getlist, getListing } from "../controllers/listing.controler.js";
import { verifyToken } from "../utils/veryfyToken.js";

const router = Router();

router.post("/create-listing",createListing)
router.delete("/delete-listing/:id",verifyToken,deletelisting)
router.put("/updatelisting/:id",verifyToken,updatelisting)
router.get("/get/:id",getlist)
// router.get("/get",getlisting)
router.get("/get",getListing)

export default router;