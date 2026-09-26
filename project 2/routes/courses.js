const router = require("express").Router();

const coursesController = require("../controllers/courses");

const { isAuthenticated } = require("../middleware/authenticate");

// Get all courses
router.get("/", coursesController.getAllCourses);
// Get a course by ID
router.get("/:id", coursesController.getCourseById);
// Create a new course
router.post("/",isAuthenticated, coursesController.createCourse);
// Update a course by ID
router.put("/:id", isAuthenticated, coursesController.updateCourse);
// Delete a course by ID
router.delete("/:id", isAuthenticated, coursesController.removeCourses);

module.exports = router;