"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = __importDefault(require("./config/mongo"));
const data_1 = require("./routes/data");
// Importamos las rutas que vamos a utilizar
const PORT = process.env.PORT || 3001;
// Creamos la aplicación de express
const app = (0, express_1.default)();
// Especificamos que vamos a utilizar CORS
app.use((0, cors_1.default)());
// Especificamos que vamos a recibir y enviar datos en formato JSON
app.use(express_1.default.json());
// Especificamos que vamos a utilizar las rutas que hemos importado
app.use(data_1.router);
// Conectamos a la base de datos
(0, mongo_1.default)();
// Inicializamos el servidor indicando el puerto en el que va a escuchar
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
