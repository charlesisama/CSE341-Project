const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// Function to validate student data
const validateStudent = (student) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        program,
        level,
        department,
        enrollmentDate,
        status
    } = student;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !program ||
        level === undefined ||
        !department ||
        !enrollmentDate ||
        !status
    ) {
        return "All student fields are required";
    }

    if (typeof level !== "number") {
        return "Level must be a number";
    }

    if (level < 100 || level > 500) {
        return "Level must be between 100 and 500";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return "Invalid email address";
    }

    const validStatuses = ["Active", "Inactive"];

    if (!validStatuses.includes(status)) {
        return "Status must be Active or Inactive";
    }

    if (typeof enrollmentDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(enrollmentDate)) {
        return "Enrollment date must use YYYY-MM-DD format";
    }

    return null;
};

//function to get all students
const getAllStudents = async (req, res) => {
    try {
        const db = mongodb.getDatabase();

        const students = await db
            .collection("students")
            .find()
            .toArray();

        res.status(200).json(students);
    } catch (error) {
        console.error("Error getting students:", error);

        res.status(500).json({
            error: "Failed to retrieve students"
        });
    }
};

//function to get a student by ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid student ID"
            });
        }

        const db = mongodb.getDatabase();

        const student = await db
            .collection("students")
            .findOne({
                _id: new ObjectId(req.params.id)
            });

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error getting student:", error);

        res.status(500).json({
            error: "Failed to retrieve student"
        });
    }
};

//function to create a new student
const createStudent = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            program,
            level,
            department,
            enrollmentDate,
            status
        } = req.body || {};

        const validationError = validateStudent(req.body || {});

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const db = mongodb.getDatabase();

        const student = {
            firstName,
            lastName,
            email,
            phone,
            program,
            level,
            department,
            enrollmentDate,
            status
        };

        const result = await db
            .collection("students")
            .insertOne(student);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        console.error("Error creating student:", error);

        res.status(500).json({
            error: "Failed to create student"
        });
    }
};

// Function to update a student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid student ID"
            });
        }

        const {
            firstName,
            lastName,
            email,
            phone,
            program,
            level,
            department,
            enrollmentDate,
            status
        } = req.body || {};

        const validationError = validateStudent(req.body || {});

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const db = mongodb.getDatabase();

        const result = await db
            .collection("students")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: {
                        firstName,
                        lastName,
                        email,
                        phone,
                        program,
                        level,
                        department,
                        enrollmentDate,
                        status
                    }
                }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully"
        });
    } catch (error) {
        console.error("Error updating student:", error);

        res.status(500).json({
            error: "Failed to update student"
        });
    }
};

// Function to delete a student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid student ID"
            });
        }
        
        const db = mongodb.getDatabase();

        const result = await db
            .collection("students")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting student:", error);

        res.status(500).json({
            error: "Failed to delete student"
        });
    }
};

module.exports = {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent
};