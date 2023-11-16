const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const swaggerDocument = require('../swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'mydatabase',
});

const Barang = require('../models/barang')(sequelize);
const Penjualan = require('../models/penjualan')(sequelize);

const barangRoutes = require('./routes/barangRoutes')(app, Barang);
const penjualanRoutes = require('./routes/penjualanRoutes')(app, Penjualan, Barang);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
