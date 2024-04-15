//Agregue una documentación de los datos dentro del archivo


const modificarCasaPorID = async (req, res) => {
    // Obtenemos el ID de la casa de los parámetros de la solicitud
    const casaID = req.params.id;

    // Obtenemos los datos actualizados de la solicitud
    const datosActualizados = req.body;

    try {
        // Desestructuramos el objeto para obtener los valores en el orden correcto
        const {
            ParcelID, // Identificador de la parcela
            LandUse, // Uso del terreno
            PropertyAddress, // Dirección de la propiedad
            SaleDate, // Fecha de venta
            SalePrice, // Precio de venta
            LegalReference, // Referencia legal
            SoldAsVacant, // Vendido como vacante
            OwnerName, // Nombre del propietario
            OwnerAddress, // Dirección del propietario
            Acreage, // Superficie
            TaxDistrict, // Distrito fiscal
            LandValue, // Valor del terreno
            BuildingValue, // Valor del edificio
            TotalValue, // Valor total
            YearBuilt, // Año de construcción
            Bedrooms, // Número de dormitorios
            FullBath, // Número de baños completos
            HalfBath // Número de medios baños
        } = datosActualizados;

        // Llamamos a la función de actualización del modelo de base de datos
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
            casaID // Pasamos el ID de la casa que se va a modificar
        ]);

        // Aquí podríamos enviar una respuesta al cliente indicando el éxito de la operación
        res.status(200).json({ success: true, message: "Casa modificada exitosamente" });

    } catch (error) {
        // En caso de error, enviamos una respuesta de error al cliente
        console.error("Error al modificar la casa:", error);
        res.status(500).json({ success: false, message: "Error al modificar la casa" });
    }
};
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

// Exporta un objeto que contiene varias funciones relacionadas con la gestión de casas
module.exports = {
    // Función para listar todas las casas disponibles
    listarCasas,

    // Función para obtener una casa por su ID
    obtenerCasaPorID,

    // Función para agregar una nueva casa
    agregarCasa,

    // Función para modificar los datos de una casa existente por su ID
    modificarCasaPorID,

    // Función para eliminar una casa por su ID
    eliminarCasa,
};
