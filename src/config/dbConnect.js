import mongoose from "mongoose";

process.loadEnvFile();

async function conectaNaDatabase(){
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default conectaNaDatabase;


