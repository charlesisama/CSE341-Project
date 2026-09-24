const swaggerAutogen = require("swagger-autogen")();

const isProduction = process.env.RENDER === "true";

const doc = {
    info: {
        title: "Student Course Management API",
        description:
            "REST API for managing students and courses in a student course management system.",
        version: "1.0.0"
    },

    host: isProduction
        ? "cse341-project2-api-msn7.onrender.com"
        : "localhost:3000",

    basePath: "/",

    schemes: isProduction
        ? ["https"]
        : ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);