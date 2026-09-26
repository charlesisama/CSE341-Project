const router = require("express").Router();

const studentsController = require("../controllers/students");

const { isAuthenticated } = require("../middleware/authenticate");

// Get all students
router.get("/", studentsController.getAllStudents);
// Get a student by ID
router.get("/:id", studentsController.getStudentById);
// Create a new student
router.post("/",isAuthenticated, studentsController.createStudent);
// Update a student by ID
router.put("/:id", isAuthenticated, studentsController.updateStudent);
// Delete a student by ID
router.delete("/:id", isAuthenticated, studentsController.deleteStudent);

module.exports = router;