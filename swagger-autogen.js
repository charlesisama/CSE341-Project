const swaggerAutogen = require("swagger-autogen")();

// Define the Swagger document
const doc = {
    info: {
        title: "Contacts API",
        description: "CSE 341 Contacts API",
    },
    host: "localhost:3000",
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Generate the Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);