const mongoose = require("mongoose")
const { MongoClient } = require("mongodb");

const mongoURI = "mongodb+srv://pawanbharambe1:pawan123@cluster0.g09fvgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectToMongo = () =>{
    mongoose.connect(mongoURI)
    
}
module.exports= connectToMongo;