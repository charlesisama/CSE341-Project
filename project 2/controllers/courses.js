const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// Validate course data
const validateCourse = (course) => {
    const {
        courseCode,
        courseName,
        description,
        credits,
        department,
        instructor,
        semester
    } = course;

    if (
        !courseCode ||
        !courseName ||
        !description ||
        credits === undefined ||
        !department ||
        !instructor ||
        !semester
    ) {
        return "All course fields are required";
    }

    if (typeof credits !== "number") {
        return "Credits must be a number";
    }

    if (credits < 1 || credits > 6) {
        return "Credits must be between 1 and 6";
    }

    if (courseCode.length < 3) {
        return "Course code must be at least 3 characters";
    }

    return null;
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const db = mongodb.getDatabase();

        const courses = await db
            .collection("courses")
            .find()
            .toArray();

        res.status(200).json(courses);
    } catch (error) {
        console.error("Error getting courses:", error);

        res.status(500).json({
            error: "Failed to retrieve courses"
        });
    }
};

// Get a course by ID
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid course ID"
            });
        }

        const db = mongodb.getDatabase();

        const course = await db
            .collection("courses")
            .findOne({
                _id: new ObjectId(id)
            });

        if (!course) {
            return res.status(404).json({
                error: "Course not found"
            });
        }

        res.status(200).json(course);
    } catch (error) {
        console.error("Error getting course:", error);

        res.status(500).json({
            error: "Failed to retrieve course"
        });
    }
};
// Create a new course
const createCourse = async (req, res) => {
    try {
        const {
            courseCode,
            courseName,
            description,
            credits,
            department,
            instructor,
            semester
        } = req.body || {};

        const validationError = validateCourse(req.body || {});

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const db = mongodb.getDatabase();

        const course = {
            courseCode,
            courseName,
            description,
            credits,
            department,
            instructor,
            semester
        };

        const result = await db
            .collection("courses")
            .insertOne(course);

        res.status(201).json({
            id: result.insertedId
        });
    } catch (error) {
        console.error("Error creating course:", error);

        res.status(500).json({
            error: "Failed to create course"
        });
    }
};

// Update an existing course
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid course ID"
            });
        }
        const {
            courseCode,
            courseName,
            description,
            credits,
            department,
            instructor,
            semester
        } = req.body || {};

        const validationError = validateCourse(req.body || {});

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const db = mongodb.getDatabase();

        const result = await db
            .collection("courses")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: {
                        courseCode,
                        courseName,
                        description,
                        credits,
                        department,
                        instructor,
                        semester
                    }
                }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course updated successfully"
        });
    } catch (error) {
        console.error("Error updating course:", error);

        res.status(500).json({
            error: "Failed to update course"
        });
    }
};

// Delete a course
const removeCourses = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid course ID"
            });
        }

        const db = mongodb.getDatabase();

        const result = await db
            .collection("courses")
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting course:", error);

        res.status(500).json({
            error: "Failed to delete course"
        });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    removeCourses,
    getCourseById
}