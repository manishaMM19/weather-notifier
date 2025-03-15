import express from "express";
import {registerUser}  from "../controllers/userController.js";
import {updateLocation}  from "../controllers/userController.js";
import {validateUser} from "../middlewares/validateUser.js"; 

const router = express.Router();

router.post("/register", validateUser, registerUser);
// router.post("/register", registerUser);

// Route for updating user's location
router.put("/update-location", updateLocation);

export default router;
