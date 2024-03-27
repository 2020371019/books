import { Router } from "express";
const router = Router();

import * as Book from '../controllers/Book.controller.js';
import { authJwt } from "../middlewares";

//Establecer ruta products mediante el metodo GET
router.get('/', Book.getBook); // todos
router.post('/', [authJwt.verifyToken,authJwt.isMasterLibrarian], Book.createBook); //admin
router.get('/:bookId', Book.getBookById); //todos
router.get('/getbygenre/:genre', Book.getBooksByGenre); //todos
router.post('/getbyauthor/', Book.getBooksByAuthor); //todos
router.put('/:bookId', [authJwt.verifyToken,authJwt.isMasterLibrarian || authJwt.verifyToken,authJwt.isPageGuardian], Book.updateBookById);//admin y moderator
router.delete('/:bookId', [authJwt.verifyToken, authJwt.isPageGuardian || authJwt.verifyToken,authJwt.isMasterLibrarian ], Book.deleteBookById);//admin y moderator

export default router;