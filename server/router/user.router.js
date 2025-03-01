import express, { Router } from 'express';
import { deleteaccount,  getAllRegistrations,  getuser, signout, test } from '../controller/user.controller.js';
import { update } from '../controller/user.controller.js';
import { verifyuser } from '../utilzation/verifyuser.js';
import { getUserCourses } from '../controller/user.controller.js';
const route=express.Router();


route.get('/test',test)
route.put('/update/:userId',verifyuser,update)
route.delete('/delete/:userId',verifyuser,deleteaccount)
route.post('/signout',signout)
route.get('/getuser',verifyuser,getuser)
route.get('/getregistration',verifyuser,getAllRegistrations)
route.get("/mycourses", verifyuser, getUserCourses);

export default route