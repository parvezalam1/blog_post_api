import express from 'express';
import {addPost, deletePost, getPost, getPosts, updatePost} from '../controllers/post.js';
const router=express.Router();
router.get('/',getPosts);
router.get('/:pid',getPost);
router.post('/',addPost);
router.delete('/:postId',deletePost);
router.put('/:postId',updatePost);
export default router;