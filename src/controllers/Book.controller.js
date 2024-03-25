import Book from '../models/Book';

export const getBook = async (req, res) => {
    const books = await Book.find();
    res.json(books);

}

export const createBook = async (req, res) => {
    try{
    const { name, author, editorial, pages, price, year, genre, review } = req.body;
    const newBook = new Book({ name, author, editorial, pages, price, year, genre, review}); 
    const bookSave = await newBook.save();
    res.status(201).json("Producto guardado con exito");
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

export const getBookById = async (req, res) => {
    const {bookId} = req.params
    const book = await Book.findById(bookId);
    res.json(book);
}


export const getBooksByGenre = async (req, res) => {
    const {genre} = req.params
    const book = await Book.find({ genre: genre });
    res.json(book);
}


export const getBooksByAuthor = async (req, res) => {
    const { author } = req.body;
    const book = await Book.find({ author: author });
    res.json(book);
}


export const updateBookById = async (req, res) => {
    
    try{
        const {bookId} = req.params
    const { name, author, editorial, pages, price, year, genre, review} = req.body;
    const book = await Book.updateOne({_id: bookId}, { $set: {name, author, editorial, pages, price, year, genre, review}});
        res.status(201).json("Producto actualizado con exito");
        } catch (error){
            res.status(500).json({message: error.message});
        }
}

export const deleteBookById = async (req, res) => {
    const {bookId} = req.params
    await Book.deleteOne({_id: bookId});
    res.json('Eliminado');
}