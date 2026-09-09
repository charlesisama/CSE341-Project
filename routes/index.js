const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello, World! Welcome to my Express server.\r\n');
});

router.use('/', require('./contacts'));

module.exports = router;