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
        await pool.query(casasModel.addRow, Object.values(nuevaCasa));
        res.status(201).json({ message: 'Casa agregada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar la casa');
    }
};

const modificarCasaPorID = async (req, res) => {
    const casaID = req.params.id;
    const datosActualizados = req.body;

    try {
        const [result] = await pool.query(casasModel.updateByID, [
            ...Object.values(datosActualizados),
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
