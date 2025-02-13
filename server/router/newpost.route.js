import express from 'express'
import {verifyuser} from '../utilzation/verifyuser.js'
import { createpost, deletepost, getpost, updatepost } from '../controller/newpost.controller.js'
const router=express.Router()


router.post('/createpost',verifyuser,createpost)
router.get('/getpost',getpost)
router.delete('/deletepost/:postId/:userId',verifyuser,deletepost)
router.put('/updatepost/:postId/:userId',verifyuser,updatepost)

export default router