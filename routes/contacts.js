const router = require("express").Router();

const contactsController = require("../controllers/contacts");

// GET all contacts
router.get("/", contactsController.getAllContacts);
//
router.get("/:id", contactsController.getContactById);
// POST a new contact
router.post("/", contactsController.createContact);

module.exports = router;