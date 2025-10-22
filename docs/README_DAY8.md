apps/backend/
├─ src/
│  ├─ config/
│  │  ├─ env.js
│  │  └─ security.js
│  ├─ middleware/
│  │  ├─ rateLimiter.js
│  │  ├─ httpsRedirect.js
│  │  ├─ errorHandler.js
│  │  └─ (existing files)
│  ├─ utils/
│  │  └─ audit.js
│  └─ server.js (wired to use new middleware)
├─ prisma/
│  └─ migrations/... (add audit migration)


chore(deps): add rate-limit, envalid, compression and security deps

security: configure helmet and remove x-powered-by header

security: add rate limiting and slow-down middleware

feat(audit): add AuditLog prisma model and audit helper

security: add HTTPS enforcement middleware and HSTS config

chore(env): add envalid-based environment validation

security: hide stack traces in production error responses

security: tighten CORS and add hpp

perf: add compression and caching for static assets

test(security): add tests for headers, rate limiting and audit logging