import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const readerSchema = new Schema({
    readername: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    roles: [{
        ref: "Librarians",
        type: Schema.Types.ObjectId
    }]
},
    {
        timestamps: true,
        versionKey: false
    })

    //Metodo para encryptar la contrasena usuario envia una contrasena
    readerSchema.statics.encryptPassword = async (password) => {
        //generar un salt para encriptar la pass
        const salt = await bcrypt.genSalt(10);
        //retornar la pass encript
        return await bcrypt.hash(password, salt);
    }

    //Metodo para comparar la pass del usuario con la pass encrypt
    readerSchema.statics.comparePassword = async (password, receivedPassword) => {
        //Comparar la pass enviada con la pass encriptada
        return await bcrypt.compare(password, receivedPassword);
    }

    export default model('Reader', readerSchema)