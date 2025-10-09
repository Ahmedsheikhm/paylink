# PayLink 💳
Digital Wallet & Payment API System

PayLink is a secure, modern digital wallet platform that lets users send, receive, and manage funds.
This repository contains the monorepo scaffold and day-by-day build plan to create a production-minded MVP.

---

## 🚀 Features (MVP)
- User authentication (JWT)
- Wallet creation & balance ledger (minor units)
- Idempotent payment/top-up endpoints
- Payment provider adapter (sandbox)
- Webhook verification + tests
- CI (GitHub Actions) + CD (container push + deploy hook)
- Docs: security & architecture

---

## 🧰 Tech Stack (MVP)
- Backend: Node.js + Express (plain JS for fast dev)
- DB: Postgres (ledger) — Docker for dev
- Cache: Redis (idempotency)
- ORM: Prisma (optional later)
- Frontend (future): React (Vite)
- DevOps: Docker, GitHub Actions, GHCR/Render

---

## ⚙️ Quick start (dev)
```bash
git clone https://github.com/Ahmedsheikhm/paylink.git
cd paylink
# add env files later (do NOT commit .env)
# run backend later per Day 2-3 instructions