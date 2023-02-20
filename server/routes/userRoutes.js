import express from "express";

import { deleteUser, getUser, login, signUp, updateUser, getPinCreator } from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/updateuser').patch(auth,updateUser);
router.route('/getuser').get(auth,getUser);
router.route('/getpinCreator/:id').get(getPinCreator);
router.route('/deleteuser/:password').delete(auth,deleteUser);


export default router