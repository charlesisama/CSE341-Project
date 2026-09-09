const router = require('express').Router();

const mongodb = require('../data/contactdb');

const contactsController = require('../controllers/contacts');

router.get('/contacts', contactsController.getAllContacts);
router.get('/contacts/:id', contactsController.getContactById);

module.exports = router;