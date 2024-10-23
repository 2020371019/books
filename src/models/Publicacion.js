import { Schema, model } from 'mongoose'

const publicacionSchema = new Schema ({
titulo: String,
author : String,
description : String,
date : String,
}, {
timestamps: true,
versionKey: false
})

export default model('Publicacion', publicacionSchema)