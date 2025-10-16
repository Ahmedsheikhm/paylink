apps/backend/
├── jest.config.cjs
├── package.json (scripts: test, test:ci)
├── tests/
│   ├── helpers/getApp.js
│   ├── health.test.js
│   ├── auth.test.js
│   └── wallet.test.js
├── src/
│   └── server.js (updated to export createApp)
└── .github/workflows/ci.yml

chore(test): add jest and supertest

refactor(server): export createApp for testable app instance

test(api): add integration tests for health, auth, wallet

test(ci): add GitHub Actions workflow for test and lint pipeline

docs(ci): add CI badge and coverage instructions