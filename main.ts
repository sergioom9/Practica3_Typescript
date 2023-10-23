import express, { Request, Response } from "npm:express@4.18.2";
import { DiscoModel, DiscoModelType } from "./Disco.ts";
import mongoose from "npm:mongoose@7.6.3";






console.log("Intentando conectarme a mongoo...");
try{

await mongoose.connect("mongodb+srv://sergioom9:nebrija22@cluster0.9dzkoo1.mongodb.net/?retryWrites=true&w=majority");
console.log("Conectado a mongo...");

//creacion de express y metodo para usar datos en formato JSON 
const miapp =express();
miapp.use(express.json());

//METODO POST AÑADIR DISCO
miapp.post("/addDisco", async (req: Request, res: Response) => {
    //creamos variable de tipo Disco usando DiscoModelType y le asignamos body request
    const body: Partial<Omit<DiscoModelType, "_id">> = req.body;
    const { nombre, autor, formato, matriz,pais,arte} = body;
    //comprobamos que tengamos todos los datos necesarios 
    if (!nombre || !autor || !formato || !pais || !arte) {
        res.status(300).send("Faltan datos");
        return;
    }
    //BUscamos si hay algun Disco con el mismo ID
    const exists = await DiscoModel.findOne({ nombre : body.nombre, autor:body.autor, formato:body.formato }).exec();
    if (exists) {
        res.status(503).send("Ya existe una disco con esos datos");
        return;
    }
    //al comprobar que no hay Disco con el mismo Id creamos el disco en Mongo
    const newDisco = await DiscoModel.create({
        nombre,
        autor,
        formato,
        matriz,
        pais,
        arte
    });
    //enviamos respuesta con los Datos Disco creado
    res.status(200).send({
        nombre: newDisco.nombre,
        autor: newDisco.autor,
        formato: newDisco.formato,
        matriz: newDisco.matriz,
        pais: newDisco.pais,
        arte: newDisco.arte,
        id: newDisco.id,
        
    });
  });



 //METODO GET ALL DISCOS
 miapp.get("/getDiscos", async (req: Request, res: Response) => {
    try{
    const Discos = await DiscoModel.find().exec();
    res.send(Discos);
    }catch(e){
        res.status(500).send("Get Discos failed");
    }
});

//METODO GET DISCO BY ID
miapp.get("/getDiscosbyId/:id", async (req: Request, res: Response) => {
    try{
    const id = req.params.id;
    const Disco = await DiscoModel.findById(id).exec();
    res.send(Disco);
    }catch(e){
        res.status(500).send("Get Discos by ID failed");
    }
  });


//METODO GET DISCOS BY NOMBRE
miapp.get("/getDiscosbyName/:nombre",async (req: Request,res: Response)=>{
    try{
    const nombre = req.params.nombre;
    const Discos = await DiscoModel.find({nombre: nombre}).exec();
    res.json(Discos); 
    }catch(e){
        res.status(500).send("Get Discos by name failed");
    }
    });

//METODO GET DISCOS BY FORMATO
miapp.get("/getDiscosbyFormat/:formato",async (req: Request,res: Response)=>{
    try{
    const formato = req.params.formato;
    const Discos = await DiscoModel.find({formato: formato}).exec();
    res.json(Discos); 
    }catch(e){
        res.status(500).send("Get Discos by Formato failed");
    }
    });


//METODO GET DISCOS BY PAIS
miapp.get("/getDiscosbyCountry/:pais",async (req: Request,res: Response)=>{
    try{
    const pais = req.params.pais;
    const Discos = await DiscoModel.find({pais: pais}).exec();
    res.json(Discos); 
    }catch(e){
        res.status(500).send("Ger Discos by country failed");
    }
    });



//METODO DELETE DISCO BY ID 
miapp.delete("/deleteDisco/:id",async (req:Request,res:Response)=>{
    try{
    const id = req.params.id;
    const Discos = await DiscoModel.findByIdAndDelete(id).exec();
    if(!Discos) res.send("No se ha encontrado el disco a borrar")
    else res.json("Disco eliminado"); 
    }catch(e){
        res.status(500).send("Delete Disco failed");
    }    
})

//METODO PUT PARA ACTUALIZAR DATOS DISCO
miapp.put("/updateDisco/:id",async (req: Request,res: Response)=>{
    try{
    const disco = req.body; //Especifico que el disco tiene la información en el body del request
    const identifier = req.params.id;
    if (!disco.nombre || !disco.autor || !disco.formato || !disco.pais || !disco.arte) {
        res.status(500).send();
            return;
    }

    const actualizar_disco = await DiscoModel.findByIdAndUpdate(identifier,disco).exec(); 

    res.send("Actualizacion completada");
    }catch(e){
        res.status(500).send("Update disco failed");
    }
    
});




//ponemos servidor a escuchar en el puerto 3000
miapp.listen(3000,()=>{
    console.log("Escuchando en puerto 3000");

});
}catch(e){
    console.log("No ha sido posible conectarse a MongoDb");
}
