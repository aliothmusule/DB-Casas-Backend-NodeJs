// controllers/casas.js

const { pool, casasModel } = require('../models/casas');

const listarCasas = async (req, res) => {
    try {
        const [rows] = await pool.query(casasModel.getAll);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al listar las casas');
    }
};

const obtenerCasaPorID = async (req, res) => {
    const casaID = req.params.id;

    try {
        const [rows] = await pool.query(casasModel.getByID, [casaID]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Casa no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la casa por ID');
    }
};

const agregarCasa = async (req, res) => {
    const nuevaCasa = req.body;

    try {
        // Desestructuramos el objeto para obtener los valores en el orden correcto
        const {
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
        } = nuevaCasa;

        // Insertar la nueva casa
        const [insertResult] = await pool.query(casasModel.addRow, [
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
        ]);

        // Obtener el ID de la casa recién agregada
        const newHouseID = insertResult.insertId;

        // Construir el objeto de respuesta con los campos específicos
        const responseObject = {
            message: 'Casa agregada correctamente',
            newHouse: {
                UniqueID: newHouseID,
                ParcelID,
                LandUse,
                PropertyAddress,
                SaleDate,
                SalePrice,
                OwnerName
            }
        };

        res.status(201).json(responseObject);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar la casa');
    }
};


const modificarCasaPorID = async (req, res) => {
    const casaID = req.params.id;
    const datosActualizados = req.body;

    try {
        // Desestructuramos el objeto para obtener los valores en el orden correcto
        const {
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
        } = datosActualizados;

        const [result] = await pool.query(casasModel.updateByID, [
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
            HalfBath,
            casaID,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Casa no encontrada' });
        }

        res.json({ message: 'Casa modificada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al modificar la casa');
    }
};

const eliminarCasa = async (req, res) => {
    const casaID = req.params.id;

    try {
        const [result] = await pool.query(casasModel.deleteRow, [casaID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Casa no encontrada' });
        }

        res.json({ message: 'Casa eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la casa');
    }
};

module.exports = {
    listarCasas,
    obtenerCasaPorID,
    agregarCasa,
    modificarCasaPorID,
    eliminarCasa,
};
