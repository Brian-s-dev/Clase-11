import express from 'express';
import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import dns from 'dns';

import authRouter from "./routes/auth.route.js";

if (ENVIRONMENT.MODE === 'development') {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

connectMongoDB()
    .then(() => {
        console.log("Conexión a MongoDB exitosa");

        app.listen(ENVIRONMENT.PORT, () => {
            console.log(`Nuestra app de express se ejecuta correctamente en el puerto ${ENVIRONMENT.PORT}`);
        });
    })
    .catch(error => {
        console.log("Error al iniciar la aplicación:", error);
    });