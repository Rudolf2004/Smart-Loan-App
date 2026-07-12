export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Smart Loan API",
    version: "1.0.0",
    description: "Authentication, document upload, and loan risk assessment API for Smart Loan.",
  },
  servers: [
    {
      url: process.env.PUBLIC_API_URL || "http://localhost:8000",
      description: "Current API server",
    },
  ],
  tags: [
    { name: "System" },
    { name: "Auth" },
    { name: "Documents" },
    { name: "Prediction" },
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
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string" },
          message: { type: "string" },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          fullName: { type: "string" },
          email: { type: "string", format: "email" },
          phone: { type: "string" },
          nationalId: { type: "string" },
          provider: { type: "string", enum: ["password", "google"] },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          user: { $ref: "#/components/schemas/User" },
          token: { type: "string" },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["fullName", "email", "phone", "nationalId", "password"],
        properties: {
          fullName: { type: "string", example: "Ama Mensah" },
          email: { type: "string", format: "email", example: "ama@example.com" },
          phone: { type: "string", example: "0240000000" },
          nationalId: { type: "string", example: "GHA-123456789-0" },
          password: { type: "string", format: "password", example: "SmartLoan123!" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["identifier", "password"],
        properties: {
          identifier: { type: "string", example: "ama@example.com" },
          password: { type: "string", format: "password", example: "SmartLoan123!" },
        },
      },
      GoogleLoginRequest: {
        type: "object",
        required: ["credential"],
        properties: {
          credential: { type: "string", description: "Google Identity Services ID token." },
        },
      },
      UploadRequest: {
        type: "object",
        required: ["purpose", "fileName", "mimeType", "data"],
        properties: {
          purpose: { type: "string", example: "collateral_document" },
          fileName: { type: "string", example: "land-title.pdf" },
          mimeType: { type: "string", example: "application/pdf" },
          data: { type: "string", description: "Base64-encoded file content." },
        },
      },
      UploadedDocument: {
        type: "object",
        properties: {
          id: { type: "string" },
          purpose: { type: "string" },
          fileName: { type: "string" },
          mimeType: { type: "string" },
          size: { type: "number" },
          url: { type: "string" },
          uploadedAt: { type: "string", format: "date-time" },
        },
      },
      LoanApplication: {
        type: "object",
        required: [
          "age",
          "income",
          "credit_score",
          "employment_status",
          "years_employed",
          "loan_amount",
          "loan_purpose",
          "loan_type",
          "repayment_period",
          "existing_debt",
          "collateral",
          "collateral_value",
          "has_guarantor",
          "guarantor_count",
        ],
        properties: {
          age: { type: "number", example: 35 },
          income: { type: "number", example: 65000 },
          credit_score: { type: "number", example: 720 },
          employment_status: { type: "string", example: "employed" },
          years_employed: { type: "number", example: 5 },
          loan_amount: { type: "number", example: 25000 },
          loan_purpose: { type: "string", example: "business" },
          loan_type: { type: "string", example: "term_loan" },
          repayment_period: { type: "string", example: "24" },
          disbursement_date: { type: "string", example: "2026-08-01" },
          loan_notes: { type: "string" },
          existing_debt: { type: "number", example: 5000 },
          collateral: { type: "string", example: "yes" },
          collateral_value: { type: "number", example: 40000 },
          collateral_ownership: { type: "string", example: "sole_ownership" },
          collateral_document: { type: "string", example: "land-title.pdf" },
          collateral_encumbrance: { type: "string", example: "no" },
          collateral_notes: { type: "string" },
          has_guarantor: { type: "string", example: "yes" },
          guarantor_count: { type: "number", example: 1 },
          guarantor1_income: { type: "number", example: 35000 },
          guarantor1_employment: { type: "string", example: "employed" },
          guarantor1_valid_id: { type: "string", example: "yes" },
          guarantor2_income: { type: "number", example: 0 },
          guarantor2_employment: { type: "string", example: "not_applicable" },
          guarantor2_valid_id: { type: "string", example: "no" },
        },
      },
      PredictionResponse: {
        type: "object",
        properties: {
          decision: { type: "string", example: "APPROVED" },
          confidence: { type: "number", example: 91 },
          message: { type: "string" },
          probabilities: {
            type: "object",
            additionalProperties: { type: "number" },
          },
        },
      },
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["System"],
        summary: "API root",
        responses: {
          "200": { description: "API metadata." },
        },
      },
    },
    "/health": {
      get: {
        tags: ["System"],
        summary: "Health check",
        responses: {
          "200": { description: "Service is healthy." },
        },
      },
    },
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Create a password account",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Account created.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          "400": { description: "Invalid registration details." },
          "409": { description: "Account already exists." },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login with email/phone and password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          "401": { description: "Invalid credentials." },
        },
      },
    },
    "/api/auth/google": {
      post: {
        tags: ["Auth"],
        summary: "Login with Google ID token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GoogleLoginRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Google login successful.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          "401": { description: "Google credential rejected." },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get the current authenticated user",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Current user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          "401": { description: "Authentication required." },
        },
      },
    },
    "/api/uploads": {
      post: {
        tags: ["Documents"],
        summary: "Upload a supporting document",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UploadRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Document uploaded.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    document: { $ref: "#/components/schemas/UploadedDocument" },
                  },
                },
              },
            },
          },
          "400": { description: "Invalid upload." },
          "401": { description: "Authentication required." },
        },
      },
    },
    "/api/predict": {
      post: {
        tags: ["Prediction"],
        summary: "Evaluate a loan application",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoanApplication" },
            },
          },
        },
        responses: {
          "200": {
            description: "Prediction result.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PredictionResponse" },
              },
            },
          },
          "400": { description: "Invalid loan application payload." },
          "500": { description: "Prediction service unavailable." },
        },
      },
    },
  },
} as const;
