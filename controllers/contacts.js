const mongodb = require('../data/contactdb');

const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    try {
        const db = mongodb.getDatabase();

        const contacts = await db
            .collection('contacts')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);

    } catch (error) {
        console.error('Error getting contacts:', error);
        res.status(500).json({
            error: 'Failed to retrieve contacts'
        });
    }
};

const getContactById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDatabase();

        const contacts = await db
            .collection('contacts')
            .find({ _id: contactId })
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);

    } catch (error) {
        console.error('Error getting contacts:', error);
        res.status(500).json({
            error: 'Failed to retrieve contacts'
        });
    }
};

// Create a new contact
const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const db = mongodb.getDatabase();

        const contact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const result = await db
            .collection("contacts")
            .insertOne(contact);

        res.status(201).json({
            id: result.insertedId
        });

    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({
            error: "Failed to create contact"
        });
    }
};



module.exports = {
    getAllContacts,
    getContactById,
    createContact
};