const router = require("express").Router();
// Swagger UI setup
const swaggerUi = require("swagger-ui-express");
// Load the Swagger document
const swaggerDocument = require("../swagger.json");

// Serve the Swagger UI at the root path
router.use("/", swaggerUi.serve);
// Setup the Swagger UI with the loaded document
router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = router;