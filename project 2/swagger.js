const swaggerAutogen = require("swagger-autogen")();

const isProduction = process.env.RENDER === "true";

const doc = {
    info: {
        title: "Student Course Management API",
        description:
            "REST API for managing students and courses with GitHub OAuth authentication.",
        version: "1.0.0"
    },

    host: isProduction
        ? "cse341-project2-api-msn7.onrender.com"
        : "localhost:3000",

    basePath: "/",

    schemes: isProduction
        ? ["https"]
        : ["http"],

    securityDefinitions: {
        githubOAuth: {
            type: "oauth2",
            flow: "accessCode",
            authorizationUrl: "https://github.com/login/oauth/authorize",
            tokenUrl: "https://github.com/login/oauth/access_token",
            scopes: {}
        }
    }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);