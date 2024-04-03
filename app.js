import libroutes from './src/routes/books.routes';
import authRoutes from './src/routes/getin.routes';
import createLibrarians from './src/libs/initialSetup';
import express from 'express';
import cors from 'cors';
const app = express();
//ejecutar la funcion por defecto
createLibrarians();
app.use(express.json());
app.use(cors());

app.use(cors());

app.get('/', (req, res) => {
    res.send('welcome to bookstore ');
});

app.use('/books', libroutes);
app.use('/getin', authRoutes);
export default app;
