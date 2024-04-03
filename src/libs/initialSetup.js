import Librarians from "../models/Librarians";

export const createLibrarians = async () => {
   try{
    const count = await Librarians.estimatedDocumentCount();
    if(count > 0) return;
    const values = await Promise.all([
        new Librarians({name: "CommonReader"}).save(), //user
        new Librarians({name: "PageGuardian"}).save(), //moderator
        new Librarians({name: "MasterLibrarian"}).save() //admin
    ]);
    console.log(values);
   } catch (error){
    console.error(error);
   }
}

export default createLibrarians;