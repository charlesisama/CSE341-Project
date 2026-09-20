const router = require("express").Router();

const studentsController = require("../controllers/students");

// Get all students
router.get("/", studentsController.getAllStudents);
// Get a student by ID
router.get("/:id", studentsController.getStudentById);
// Create a new student
router.post("/", studentsController.createStudent);
// Update a student by ID
router.put("/:id", studentsController.updateStudent);
// Delete a student by ID
router.delete("/:id", studentsController.deleteStudent);

module.exports = router;