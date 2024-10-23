import { Router } from "express";
const router = Router();

import * as Publicacion from '../controllers/publicacionesController';

//rutas

router.get('/', Publicacion.getPublication); // todos
router.post('/', Publicacion.createPublication); //
router.get('/:publicId', Publicacion.getPublication); //todos

export default router;
