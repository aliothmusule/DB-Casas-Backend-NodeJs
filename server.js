const express = require('express');
const cors = require('cors');
require('dotenv').config();
const CasaRouter = require('./routes/casa');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // Aseguramos que haya un puerto definido

        this.basePath = '/api/v2';
        this.casaPath = `${this.basePath}/casa`;

        this.middlewares();
        this.routes();
        this.handleErrors(); // Agregamos el manejo de errores
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.casaPath, CasaRouter);
    }

    handleErrors() {
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

module.exports = Server;
