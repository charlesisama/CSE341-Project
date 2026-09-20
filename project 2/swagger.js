const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Student Course Management API",
        description:
            "REST API for managing students and courses in a student course management system.",
        version: "1.0.0"
    },
    host: "localhost:3000",
    schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);