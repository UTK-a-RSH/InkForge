import express, { Router } from 'express'
import { createComment, getComments } from '../controllers/comment.controller.js';
import {verifyUser} from '../utils/verifyUser.js'


const router = express.Router();

router.post('/create', verifyUser, createComment);
router.get('/getComments/:postId', getComments)

export default router;