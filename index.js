const express = require("express");
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

// Create express server
const app = express();

// DATABASE
dbConnection();

// CORS
app.use(cors());

// Listen requests
app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});

/* Reading body */
app.use(express.json());

/* Routes */
// AUTH
app.use('/api/auth', require('./routes/auth'));
// CRUD Events
app.use('/api/events', require('./routes/events'));



// PUBLIC DIRECTORY
app.use(express.static('public'));