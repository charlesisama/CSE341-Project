const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Student Course Management API",
        description:
            "REST API for managing students and courses in a student course management system.",
        version: "1.0.0"
    },
    host: "cse341-project2-api-msn7.onrender.com",
    basePath: "/",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);