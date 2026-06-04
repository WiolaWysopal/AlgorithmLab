const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AlgorithmLab API",
      version: "1.0.0",
      description:
        "REST API for sorting algorithm visualization, PostgreSQL algorithm descriptions, and AI-powered explanations.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local backend server",
      },
    ],
  },
  apis: ["./backend/server.js", "./server.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
