const router = require("express").Router();

const contactsController = require("../controllers/contacts");

// GET all contacts
router.get("/", contactsController.getAllContacts);
//
router.get("/:id", contactsController.getContactById);
// POST a new contact
router.post("/", contactsController.createContact);

// PUT/update an existing contact
router.put("/:id", contactsController.updateContact);

// DELETE a contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;