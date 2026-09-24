const swaggerAutogen = require("swagger-autogen")();

require("dotenv").config();

const doc = {
    info: {
        title: "Student Course Management API",
        description:
            "REST API for managing students and courses in a student course management system.",
        version: "1.0.0"
    },
    host: process.env.RENDER_EXTERNAL_HOSTNAME || "localhost:3000",
    schemes: process.env.RENDER_EXTERNAL_HOSTNAME ? ["https"] : ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);