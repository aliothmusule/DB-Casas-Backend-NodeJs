const { Router } = require('express');
const {
    listarCasas,
    obtenerCasaPorID,
    agregarCasa,
    modificarCasaPorID,
    eliminarCasa
} = require('../controllers/casas');

const router = Router();

router.get('/', listarCasas);
router.get('/:id', obtenerCasaPorID);
router.post('/', agregarCasa);
router.patch('/:id', modificarCasaPorID);
router.delete('/:id', eliminarCasa);

module.exports = router;
