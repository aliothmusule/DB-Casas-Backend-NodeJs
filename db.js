// Importa la librería mysql2 y la función de promesa
const mysql2 = require('mysql2/promise');
// Importa la librería dotenv para cargar las variables de entorno desde un archivo .env
require('dotenv').config();

// Configuración de la conexión a la base de datos
const config= {
    host: process.env.DB_HOST, // Obtiene el host de la base de datos desde las variables de entorno
    port: process.env.DB_PORT, // Obtiene el puerto de la base de datos desde las variables de entorno
    database: process.env.DB_DATABASE, // Obtiene el nombre de la base de datos desde las variables de entorno
    user: process.env.DB_USER, // Obtiene el usuario de la base de datos desde las variables de entorno
    password: process.env.DB_PASSWORD, // Obtiene la contraseña de la base de datos desde las variables de entorno
    connectionLimit: process.env.DB_CONNECTION_LIMIT, // Obtiene el límite de conexiones de la base de datos desde las variables de entorno
};

// Crea un pool de conexiones a la base de datos utilizando la configuración especificada
const pool = mysql2.createPool(config);

// Exporta el pool de conexiones para que pueda ser utilizado en otros módulos
module.exports = pool;

// Imprime en la consola la configuración de la conexión a la base de datos
console.log('Configuración de conexión a la base de datos:');
console.log(config);
