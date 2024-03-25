import app from '../app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
app.listen(3000);

mongoose.connect(process.env.MONGODB_URI
    ).then(() => console.log('Conectando a la base de datos Atlas'))
    .catch((error) => console.error(error))

console.log('bookstore in the port',3000);