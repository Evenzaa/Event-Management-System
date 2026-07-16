// Part 1

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
              enum: ["user", "organizer"],
              example: "user",
            },
            profileImage: {
              type: "string",
              example: "https://example.com/profile.jpg",
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
            title: {
              type: "string",
              example: "Tech Conference 2026",
            },
            description: {
              type: "string",
              example: "Annual technology conference.",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-12-01T10:00:00.000Z",
            },
            location: {
              type: "string",
              example: "Cairo",
            },
          capacity: {
  type: "integer",
  example: 150,
},

ticketTypes: {
  type: "object",
  properties: {
    general: {
      type: "object",
      properties: {
        price: {
          type: "number",
          example: 300,
        },
        availableSeats: {
          type: "integer",
          example: 100,
        },
      },
    },
    vip: {
      type: "object",
      properties: {
        price: {
          type: "number",
          example: 700,
        },
        availableSeats: {
          type: "integer",
          example: 50,
        },
      },
    },
  },
},
            images: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                 "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
                "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
              ],
            },
            category: {
              type: "string",
              example: "Technology",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["tech", "conference"],
            },
           
          },
        },

       Booking: {
  type: "object",
  properties: {
    _id: {
      type: "string",
      example: "685b11112222333344445555",
    },

    tickets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ticketType: {
            type: "string",
            enum: ["general", "vip"],
            example: "general",
          },
          quantity: {
            type: "integer",
            example: 2,
          },
          price: {
            type: "number",
            example: 300,
          },
          subtotal: {
            type: "number",
            example: 600,
          },
        },
      },
    },

    totalPrice: {
      type: "number",
      example: 1300,
    },

  paymentStatus: {
  type: "string",
  enum: [
    "pending",
    "paid",
    "failed",
    "refunded"
  ],
  example: "paid",
},

status: {
  type: "string",
  enum: [
    "confirmed",
    "cancelled",
    "completed"
  ],
  example: "confirmed",
},
  },
},
PaymentRequest: {
  type: "object",
  required: [
    "bookingId",
    "paymentMethod"
  ],

  properties: {

    bookingId: {
      type: "string",
      example: "6a589de1173b433626d3b62d",
    },

    paymentMethod: {
      type: "string",
      enum: [
        "card",
        "paypal",
        "stripe",
        "wallet"
      ],
      example: "card",
    },

  },
},
Review: {
  type: "object",
  properties: {
    _id: {
      type: "string",
      example: "685c11112222333344445555",
    },
    userId: {
      $ref: "#/components/schemas/User",
    },
    eventId: {
      type: "string",
      example: "685a7d4d0a123456789abcd1",
    },
    rating: {
      type: "number",
      minimum: 1,
      maximum: 5,
      example: 5,
    },
    comment: {
      type: "string",
      example: "Amazing event!",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2026-06-30T18:30:00.000Z",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2026-06-30T18:30:00.000Z",
    },
  },
},

ReviewInput: {
  type: "object",
  required: ["eventId", "rating"],
  properties: {
    eventId: {
      type: "string",
      example: "685a7d4d0a123456789abcd1",
    },
    rating: {
      type: "number",
      minimum: 1,
      maximum: 5,
      example: 5,
    },
    comment: {
      type: "string",
      example: "Amazing event!",
    },
  },
  example: {
    eventId: "685a7d4d0a123456789abcd1",
    rating: 5,
    comment: "Amazing event!",
  },
},

UpdateReviewInput: {
  type: "object",
  properties: {
    rating: {
      type: "number",
      minimum: 1,
      maximum: 5,
      example: 4,
    },
    comment: {
      type: "string",
      example: "Updated review comment",
    },
  },
  example: {
    rating: 4,
    comment: "Updated review comment",
  },
},

ReviewResponse: {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true,
    },
    message: {
      type: "string",
      example: "Review added successfully",
    },
    data: {
      $ref: "#/components/schemas/Review",
    },
  },
},

ReviewsResponse: {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true,
    },
    count: {
      type: "integer",
      example: 2,
    },
    averageRating: {
      type: "number",
      example: 4.5,
    },
    data: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Review",
      },
    },
  },
},

        Coupon: {
          type: "object",
          properties: {
            code: {
              type: "string",
              example: "SUMMER25",
            },
            discount: {
              type: "number",
              example: 25,
            },
            expiresAt: {
              type: "string",
              format: "date-time",
              example: "2026-12-31T23:59:59.000Z",
            },
          },
        },
        // Part 2

        MessageResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation completed successfully",
            },
          },
        },

        ErrorResponse: {
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

        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Ahmed Mohamed",
            },
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123",
            },
            role: {
              type: "string",
              enum: ["user", "organizer"],
              example: "user",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123",
            },
          },
        },

        LoginResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            token: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx.xxxxx",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },

        ForgotPasswordRequest: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
          },
        },

        ResetPasswordRequest: {
          type: "object",
          required: ["password"],
          properties: {
            password: {
              type: "string",
              format: "password",
              example: "NewPassword123",
            },
          },
        },

        UpdateRoleRequest: {
          type: "object",
          required: ["role"],
          properties: {
            role: {
              type: "string",
              enum: ["user", "organizer"],
              example: "organizer",
            },
          },
        },

        UsersResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            users: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        // Part 3

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
  name: "Payment",
  description: "Payment APIs",
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
