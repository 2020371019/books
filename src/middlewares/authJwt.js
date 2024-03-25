import  jwt  from "jsonwebtoken";
import Reader from '../models/Reader';
import Librarians from "../models/Librarians";


//Validar si el token es valido
export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    try {
        if (!token) {
            throw new Error("No se ha proporcionado ningún token");
        }

        // Extraer la información del token
        const decoded = jwt.verify(token, process.env.SECRET);
        req.readerId = decoded.id;

        // Buscar usuario en la base de datos
        const reader = await Reader.findById(req.readerId, { password: 0 });

        // Validar si el usuario existe
        if (!reader) {
            throw new Error("Usuario no encontrado");
        }


        // Continuar con la siguiente función si el usuario existe
        next();
    } catch (error) {
        if (error.message === 'jwt malformed') {
            return res.status(403).json({ message: "El token proporcionado no es válido" });
        } else {
            return res.status(403).json({ message: error.message });
        }
    }
};

export const isPageGuardian = async (req, res, next) => {
    //busca el usuario en la base de datos
    const reader = await Reader.findById(req.readerId);
    //buscar los roles del usuario
    //const roles = await Role.find({ _id: { $in: user.roles } });
    const librarians = await Librarians.find({_id: {$in: reader.roles}});
    
    for(let i = 0; i < librarians.length; i++){
        console.log(librarians[i].name);
        if(librarians[i].name == "PageGuardian"){
            next();
            return;
        }
    }
    return res.status(403).json({message: "You need to be a PageGuardian"});
}

export const isMasterLibrarian = async (req, res, next) => {
    //busca el usuario en la base de datos
    
    const reader = await Reader.findById(req.readerId);
    //buscar los roles del usuario
    //const roles = await Role.find({ _id: { $in: user.roles } });
    const librarians = await Librarians.find({_id: {$in: reader.roles}});
    
    for(let i = 0; i < librarians.length; i++){
        console.log(librarians[i].name);
        if(librarians[i].name == "MasterLibrarian"){
            next();
            return;
        }
    }
    return res.status(403).json({message: "You need to be a MasterLibrarian"});
}
