import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";

router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIn)
router.get('/obtenerusuario/:id', authCtrl.obtenerUsuarioxId)
router.put('/updateUserById/:userID', authCtrl.updateUserById);


export default router;