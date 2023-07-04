const express = require('express');
const app = express();


const port = process.env.PORT || 3000;

const routes = require('./routes.js');

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});