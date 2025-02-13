import express from 'express'

import { signin, signup,googleprovider, registermailsubmit } from '../controller/auth.controller.js';

const route =express.Router();

route.post('/signup',signup)
route.post('/signin',signin)
route.post('/googleprovider',googleprovider)
route.post('/register',registermailsubmit)

export default route