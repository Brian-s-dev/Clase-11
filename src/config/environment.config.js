import dotenv from "dotenv";

//Lee el archivo .env e inyecta las variables de entorno de process.env
dotenv.config();

const ENVIRONMENT = {
    MONGO_DB_CONENECTION_STRING: process.env.MONGO_DB_CONENECTION_STRING,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
}

export default ENVIRONMENT; 