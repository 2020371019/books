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
    try {
        const { titulo, description } = req.body;

        // Verifica que todos los campos necesarios estén presentes
        if (!reader) {
            return res.status(400).json({ message: "El campo 'reader' es obligatorio" });
        }
        const newPublication = new Publicacion({
            titulo,
            description,
            // reader 
        });

        const publicationSaved = await newPublication.save();
        res.status(201).json({ message: "Publicación subida con éxito", publication: publicationSaved });
    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error, la publicación no se creó", error: error.message });
    }
}

export const getpublicationById = async (req, res) => {
    try{
    const {publicId} = req.params
    const publicacion = await Publicacion.findById(publicId);
    res.json(publicacion);
    } catch(error){
        res.status(500).json({message: "La publicacion no Existe"});
    }
}



// export const createPublication = async (req, res) => {
//     try {
//         const { titulo, author, description, reader } = req.body;

//         // Verifica que todos los campos necesarios estén presentes
//         if (!reader) {
//             return res.status(400).json({ message: "El campo 'reader' es obligatorio" });
//         }

//         const newPublication = new Publicacion({
//             titulo,
//             author,
//             description,
//             reader // Agrega el ID del lector
//         });

//         const publicationSaved = await newPublication.save();
//         res.status(201).json({ message: "Publicación subida con éxito", publication: publicationSaved });
//     } catch (error) {
//         res.status(500).json({ message: "Ocurrió un error, la publicación no se creó", error: error.message });
//     }
// }