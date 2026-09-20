const router = require("express").Router();

const coursesController = require("../controllers/courses");

// Get all courses
router.get("/", coursesController.getAllCourses);
// Get a course by ID
router.get("/:id", coursesController.getCourseById);
// Create a new course
router.post("/", coursesController.createCourse);
// Update a course by ID
router.put("/:id", coursesController.updateCourse);
// Delete a course by ID
router.delete("/:id", coursesController.removeCourses);

module.exports = router;