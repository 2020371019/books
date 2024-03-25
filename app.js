import productsRoutes from './src/routes/books.routes';
import authRoutes from './src/routes/getin.routes';
import createLibrarians from './src/libs/initialSetup';
import express from 'express';
const app = express();
//ejecutar la funcion por defecto
createLibrarians();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to bookstore ');
});

app.use('/books', productsRoutes);
app.use('/getin', authRoutes);
export default app;