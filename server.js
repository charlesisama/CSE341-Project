const express = require('express');
const app = express();

const mongodb = require('./routes/data/database');

app.use('/', require('./routes'));


const port = process.env.PORT || 3000;

mongodb.initDb(err => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });

    }
});

