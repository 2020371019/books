import { Router } from "express";
const router = Router();

import * as Book from '../controllers/Book.controller.js';
import { authJwt } from "../middlewares";

//Establecer ruta products mediante el metodo GET
router.get('/', Book.getBook); // todos
router.post('/', Book.createBook); //admin
router.get('/:bookId', Book.getBookById); //todos
router.get('/getbygenre/:genre', Book.getBooksByGenre); //todos
router.post('/getbyauthor/', Book.getBooksByAuthor); //todos
router.put('/:bookId', Book.updateBookById);//admin y moderator
router.delete('/:bookId', Book.deleteBookById);//admin y moderator

//Haciendo uso de los tokens 
router.delete('/del/:bookId', [authJwt.verifyToken, authJwt.isMasterLibrarianOrPageGuardian ], Book.deleteBookById);//admin y moderator
router.post('/create', [authJwt.verifyToken,authJwt.isMasterLibrarian], Book.createBook); //admin
router.put('/mod/:bookId', [authJwt.verifyToken,authJwt.isMasterLibrarianOrPageGuardian], Book.updateBookById);//admin y moderator



export default router;
