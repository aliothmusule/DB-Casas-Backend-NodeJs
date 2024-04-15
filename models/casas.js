const mysql2 = require('mysql2/promise'); // Utiliza MySQL con promesas para operaciones asincrónicas.
require('dotenv').config(); // Carga variables de entorno desde un archivo .env para manejar configuraciones sin revelar datos sensibles.

const config = {
    host: process.env.DB_HOST, // Host de la base de datos
    port: process.env.DB_PORT, //Puerto de la base de datos
    database: process.env.DB_DATABASE, //Nombre de la base de datos.
    user: process.env.DB_USER, //Usuario de la base de datos.
    password: process.env.DB_PASSWORD, //Contraseña del usuario.
    connectionLimit: process.env.DB_CONNECTION_LIMIT, //Límite de conexiones en el pool.
};

const pool = mysql2.createPool(config);
// Ejemplo de modelo con consultas preparadas
const casasModel = {
    getAll: 'SELECT * FROM casasalioth', //Retorna todas las filas de la tabla.
    getByID: 'SELECT * FROM casasalioth WHERE UniqueID = ?', // Retorna una fila específica basada en UniqueID
    addRow: ` // Inserta una nueva fila en la tabla con múltiples campos especificados. // Inserta una nueva fila con los valores proporcionados como parámetros.
        INSERT INTO 
        casasalioth (
          
            ParcelID,     
            LandUse, 
            PropertyAddress, 
            SaleDate, 
            SalePrice,
            LegalReference,
            SoldAsVacant,
            OwnerName,
            OwnerAddress,
            Acreage,
            TaxDistrict,
            LandValue,
            BuildingValue,
            TotalValue,
            YearBuilt,
            Bedrooms,
            FullBath,
            HalfBath
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    updateByID: ` // Actualiza una fila existente en la tabla basándose en UniqueID.
        UPDATE casasalioth 
        SET 
            ParcelID=?, 
            LandUse=?, 
            PropertyAddress=?, 
            SaleDate=?, 
            SalePrice=?,
            LegalReference=?,
            SoldAsVacant=?,
            OwnerName=?,
            OwnerAddress=?,
            Acreage=?,
            TaxDistrict=?,
            LandValue=?,
            BuildingValue=?,
            TotalValue=?,
            YearBuilt=?,
            Bedrooms=?,
            FullBath=?,
            HalfBath=?
        WHERE UniqueID=?
    `,
    deleteRow: 'DELETE FROM casasalioth WHERE UniqueID=?', //Actualiza la fila que coincide con el UniqueID con los nuevos valores proporcionados.
};

module.exports = {
    pool,
    casasModel, //Esto permite que otros archivos en la aplicación importen pool y casasModel para realizar operaciones de base de datos.
};
