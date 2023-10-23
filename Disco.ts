import mongoose from "npm:mongoose@7.6.3";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DiscoSchema=new Schema({
    nombre: {type:String,required:true},
    autor : {type:String,required:true},
    formato: {type:String,required:true},
    matriz:{type:[String],required:false},
    pais: {type:String,required:true},
    arte: {type:String,required:true},
});

export type DiscoModelType={
    nombre: string,
    autor : string,
    formato: string,
    matriz: string[],
    pais:string,
    arte:string
}

export const DiscoModel = mongoose.model<DiscoModelType>("disco",DiscoSchema);