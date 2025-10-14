//end of day 4 folder structure
apps/backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   └── server.js         (or app.js + server.js)
├── package.json
├── .env
└── README.md

chore(deps): add bcryptjs + jsonwebtoken for auth

chore(env): add JWT and bcrypt config

feat(auth): add authController with register and login

feat(auth): add /api/auth routes (register, login)

feat(auth): add JWT auth middleware for protected routes

chore(server): register auth routes and example protected route

test(auth): verified register/login and JWT protected /api/me
