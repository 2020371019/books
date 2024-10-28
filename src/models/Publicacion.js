import { Schema, model } from 'mongoose';

const publicacionSchema = new Schema({
    titulo: String,
    author: String,
    description: String,
    reader: {
        type: Schema.Types.ObjectId,
        ref: 'Reader', 
        required: true 
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Publicacion', publicacionSchema);
