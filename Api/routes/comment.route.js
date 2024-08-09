import express, { Router } from 'express'
import { createComment, getComments, likeComment, editComment } from '../controllers/comment.controller.js';
import {verifyUser} from '../utils/verifyUser.js'


const router = express.Router();

router.post('/create', verifyUser, createComment);
router.get('/getComments/:postId', getComments);
router.put('/likeComment/:commentId', verifyUser, likeComment);
router.put('/editComment/:commentId', verifyUser, editComment);


export default router;