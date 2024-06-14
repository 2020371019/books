//importar modelo de datos User
import Reader from '../models/Reader';
import { signToken } from "../utils/token";
import Librarians from "../models/Librarians";

//Exportar las funciones de signUp y signIn
export const signUp = async (req, res) => {
  try {
    const { readername, email, password, roles } = req.body;

    // Crear un nuevo usuario
    const newReader = new Reader({
      readername,
      email,
      password: await Reader.encryptPassword(password),
    });
    //condicional para asignar roles en caso de que no se asignen roles
    //se asigna un rol de usuario
    if(req.body.roles){
      const foundRoles = await Librarians.find({name: {$in: roles} });
      newReader.roles = foundRoles.map(role => role.id);
    }else{
      const role = await Librarians.findOne({ name: "CommonReader"});
      newReader.roles = [role.id];
    }
    
    // Guardar el usuario en la base de datos
    const savedReader = await newReader.save();
    console.log(savedReader);
    // Crear el token después de guardar el usuario
    const token = signToken(savedReader);

    // Responder al cliente con el token
    res.status(200).json({ status: 200, message:"Tu Usuario ha sido registrado" } );
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

//obtener usuario por id

export const obtenerUsuarioxId = async (req, res) => {
  const {id} = req.params
  const readerFound = await Reader.findById(id);
  //si no se encuentra el usuario mandar mensaje de error
  if(!readerFound) 
  return res.status(500)
.json({message:"Usuario no encontrado"});
  
  //Mostrar usuario encontrado
  //console.log(userFound);
  //Enviar status y el token en la respuesta
  res.status(200).json({readerFound});
}


//funcion para iniciar sesion 
export const signIn = async (req, res) => {
    const readerFound = await Reader.findOne({email: req.body.email}).populate("roles");
    //si no se encuentra el usuario mandar mensaje de error
    if(!readerFound) return res.status(400).json({message:"Usuario no encontrado"});
    
    const matchPassword = await Reader.comparePassword(req.body.password, readerFound.password);

    if(!matchPassword) return res.status(401).json({token: null, message: "contra invalida"});
    
    //generar un token
    const token = signToken({id: readerFound._id}, process.env.SECRET, {
      expiresIn: 86400
    });
    //Mostrar usuario encontrado
    //console.log(userFound);
    //Enviar status y el token en la respuesta
    res.status(200).json({token});
}