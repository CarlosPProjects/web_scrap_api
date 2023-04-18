import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/mongo";
import { router } from "./routes/data";

// Importamos las rutas que vamos a utilizar
const PORT = process.env.PORT || 3001;
// Creamos la aplicación de express
const app = express();
// Especificamos que vamos a utilizar CORS
app.use(cors());
// Especificamos que vamos a recibir y enviar datos en formato JSON
app.use(express.json());
// Especificamos que vamos a utilizar las rutas que hemos importado
app.use(router);
// Conectamos a la base de datos
db();
// Inicializamos el servidor indicando el puerto en el que va a escuchar
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
