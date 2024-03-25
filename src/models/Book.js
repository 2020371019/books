import { Schema, model } from 'mongoose'

const bookSchema = new Schema ({
name: String,
author : String,
editorial : String,
pages : Number,
price: Number,
year: Number,
genre: String,
review: String
}, {
timestamps: true,
versionKey: false
})

export default model('Book', bookSchema)