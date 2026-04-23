import mongoose from "mongoose";
import ENVIRONMENT from "./environment.config.js";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(ENVIRONMENT.MONGO_DB_CONENECTION_STRING + '/' + ENVIRONMENT.MONGO_DB_NAME);
        console.log("La conexion funciona");
    } catch (error) {
        console.log("Hubo un fallo en la conexion de la BD", error);
    }
}

console.log(ENVIRONMENT.MONGO_DB_CONENECTION_STRING + '/' + ENVIRONMENT.MONGO_DB_NAME);

export default connectMongoDB;  