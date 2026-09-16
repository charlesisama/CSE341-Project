const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "CSE 341 Contacts API - Contacts Part 2",
        version: "1.0.0"
    },
    host: "cse341-t68c.onrender.com",
    schemes: ["https"],
    basePath: "/",
    tags: [
        {
            name: "Contacts",
            description: "Operations for managing contacts"
        }
    ]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);