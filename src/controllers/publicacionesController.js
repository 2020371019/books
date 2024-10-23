import Publicacion from '../models/Publicacion';

export const getPublication = async (req, res) => {
    try{
    const publics = await Publicacion.find();
    res.json(publics);
    }
    catch (error){
        res.status(500).json({message: "Ocurrio un error"});
    }
}

export const createPublication = async (req, res) => {
    try{
    const { titulo, author, description, date} = req.body;
    const newPubliction = new Publicacion({ titulo, author, description, date}); 
    const publicsSave = await newPubliction.save();
    res.status(201).json("Publicacion subida con exito");
    } catch (error){
        res.status(500).json({message: "Ocurrio un error tu libro no se creo"});
    }
}

export const getBookById = async (req, res) => {
    try{
    const {publicId} = req.params
    const publicacion = await Publicacion.findById(publicId);
    res.json(publicacion);
    } catch(error){
        res.status(500).json({message: "La publicacion no Existe"});
    }
}
