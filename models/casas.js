const mysql2 = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
};

const pool = mysql2.createPool(config);
// Ejemplo de modelo con consultas preparadas
const casasModel = {
    getAll: 'SELECT * FROM casasalioth',
    getByID: 'SELECT * FROM casasalioth WHERE UniqueID = ?',
    addRow: `
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
    updateByID: `
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
    deleteRow: 'DELETE FROM casasalioth WHERE UniqueID=?',
};

module.exports = {
    pool,
    casasModel,
};
