apps/backend/
├── prisma/
├── src/
│   ├── config/
│   │   └── logger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── walletController.js
│   │   ├── transactionController.js
│   │   └── merchantController.js (optional)
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── routes/
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   └── response.js
│   ├── validation/
│   │   └── auth.schema.js
│   └── server.js
├── prisma/seed.js
├── package.json
└── .env

### API response format
All API responses follow the wrapper:

Success:
{
  "success": true,
  "message": "OK",
  "data": { ... }
}

Error:
{
  "success": false,
  "error": "ErrorCode",
  "message": "Detailed message",
  "details": [ ... ] // optional, validation errors

}
chore(deps): add zod + pino for validation and logging

chore(utils): add asyncHandler and response helpers

feat(logging): add pino http logger config

feat(validation): add zod validation middleware and example schemas

feat(api): add centralized error handler middleware

refactor(api): use asyncHandler and response wrappers in controllers

chore(server): wire logger, validation and error middleware

docs(api): document response format