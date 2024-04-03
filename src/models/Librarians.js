import { Schema, model } from 'mongoose'

const librariansSchema = new Schema({
    name: String
}, {
    versionKey: false
})
export default model('Librarians', librariansSchema)