const express = require('express');
const app = express();

const mongodb = require('./data/contactdb');


app.use('/', require('./routes'));

const port = process.env.PORT || 3000;

mongodb.initDb()
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
    });

