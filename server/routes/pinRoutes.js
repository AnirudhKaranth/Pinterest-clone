import express from 'express'
import { createPin, deletePin, getAllPins, savePin, addComment, getPinDetail, deleteComment } from '../controllers/pinController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/createPin').post(auth, createPin);
router.route('/getAllPins').get(getAllPins);
router.route('/savePin').patch(auth,savePin);
router.route('/comment/:id').patch(auth,addComment);
router.route('/deleteComment/:id').delete(auth,deleteComment);
router.route('/deletePin/:id').delete(auth,deletePin);
router.route('/getPinDetails/:id').get(auth,getPinDetail);



export default router 