import mongoose from "mongoose";

process.loadEnvFile();

mongoose.connect(process.env.DB_CONNECTION_STRING);

