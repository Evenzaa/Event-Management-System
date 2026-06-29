import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Evenza API",
      version: "1.0.0",
      description: "Event Booking Platform API",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "685a7b3d4e2c8f0012ab3456",
            },
            name: {
              type: "string",
              example: "Ahmed Mohamed",
            },
            email: {
              type: "string",
              example: "ahmed@gmail.com",
            },
            role: {
              type: "string",
              example: "user",
            },
            profileImage: {
              type: "string",
            },
            isVerified: {
              type: "boolean",
              example: true,
            },
          },
        },

        Event: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            date: {
              type: "string",
              format: "date-time",
            },
            location: {
              type: "string",
            },
            price: {
              type: "number",
            },
            capacity: {
              type: "integer",
            },
            category: {
              type: "string",
            },
            images: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },

        Booking: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            quantity: {
              type: "integer",
            },
            totalPrice: {
              type: "number",
            },
            status: {
              type: "string",
            },
          },
        },

        Review: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            rating: {
              type: "number",
            },
            comment: {
              type: "string",
            },
          },
        },

        Coupon: {
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            discount: {
              type: "number",
            },
            expiresAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },
      },
    },

    tags: [
      {
        name: "Auth",
        description: "Authentication APIs",
      },
      {
        name: "Users",
        description: "User APIs",
      },
      {
        name: "Events",
        description: "Public Events APIs",
      },
      {
        name: "Organizer Events",
        description: "Organizer Events APIs",
      },
      {
        name: "Bookings",
        description: "Booking APIs",
      },
      {
        name: "Reviews",
        description: "Review APIs",
      },
      {
        name: "Favorites",
        description: "Favorites APIs",
      },
      {
        name: "Coupons",
        description: "Coupon APIs",
      },
      {
        name: "Admin",
        description: "Admin APIs",
      },
      {
        name: "Dashboard",
        description: "Dashboard APIs",
      },
      {
        name: "Upload",
        description: "Image Upload APIs",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
