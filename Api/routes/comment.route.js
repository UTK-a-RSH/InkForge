import express, { Router } from 'express'
import { createComment, getComments, likeComment, editComment, deleteComment, getcomments } from '../controllers/comment.controller.js';
import {verifyUser} from '../utils/verifyUser.js'


const router = express.Router();

router.post('/create', verifyUser, createComment);
router.get('/getComments/:postId', getComments);
router.put('/likeComment/:commentId', verifyUser, likeComment);
router.put('/editComment/:commentId', verifyUser, editComment);
router.delete('/deleteComment/:commentId', verifyUser, deleteComment);
router.get('/getcomments', verifyUser, getcomments);


export default router;