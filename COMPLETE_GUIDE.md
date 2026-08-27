# SupportPilot — Complete Setup & Deployment Guide

**AI-powered customer support agent for small businesses.**

SupportPilot answers website visitors instantly, captures leads, and emails conversation summaries to your team — so you never lose a customer to slow response times.

**Built for:** AI Automation Internship Program by DaFi Labs × EmpRadar.ai  
**Stack:** NestJS · React + Vite · Google Gemini · Resend · Swagger · Sentry

---

## Table of Contents

1. [What is SupportPilot?](#1-what-is-supportpilot)
2. [Folder Structure](#2-folder-structure)
3. [Prerequisites](#3-prerequisites)
4. [Free API Keys Setup](#4-free-api-keys-setup)
5. [Local Setup](#5-local-setup)
6. [Running Locally](#6-running-locally)
7. [Testing Everything](#7-testing-everything)
8. [Deployment on Render](#8-deployment-on-render)
9. [Deployment on Vercel](#9-deployment-on-vercel)
10. [Deployment with Docker](#10-deployment-with-docker)
11. [Troubleshooting](#11-troubleshooting)
12. [Demo Recording Checklist](#12-demo-recording-checklist)
13. [LinkedIn Post Template](#13-linkedin-post-template)
14. [Free Tier Limits](#14-free-tier-limits)

---

## 1. What is SupportPilot?

SupportPilot is a full-stack AI customer support product.

### The Problem

Small businesses lose leads because they cannot respond to website visitors fast enough. Customers expect instant answers, but small teams cannot be online 24/7.

### The Solution

SupportPilot acts as an AI support agent that:

- Chats with website visitors in real time
- Uses Google Gemini to answer questions based on your business profile
- Emails conversation summaries to your support team
- Tracks errors and monitors performance with Sentry
- Exposes everything through documented REST APIs

### Who is it for?

- Small business websites
- SaaS startups
- E-commerce stores
- Service-based businesses
- Any team that wants 24/7 support without hiring more staff

---

## 2. Folder Structure

```
supportpilot/
├── src/                          # NestJS backend
│   ├── main.ts                   # App bootstrap, Swagger, Sentry
│   ├── app.module.ts             # Root module
│   ├── common/
│   │   ├── filters/              # Sentry exception filter
│   │   └── interceptors/         # Request logging
│   └── modules/
│       ├── chat/                 # Chat API + DTOs
│       ├── email/                # Email API + DTOs
│       ├── settings/             # Business profile API
│       └── health/               # Health + Sentry test
├── frontend/                     # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx               # Landing page + dashboard
│   │   ├── App.css               # Premium styling
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── test/                         # E2E tests
├── .env.example                  # Environment variables template
├── Dockerfile                    # Docker deployment
├── render.yaml                   # Render deployment config
├── vercel.json                   # Vercel deployment config
├── api/                          # Vercel serverless entry
│   └── index.ts
├── README.md                     # Short README
├── COMPLETE_GUIDE.md             # This file
├── package.json                  # Backend dependencies
└── tsconfig.json                 # TypeScript config
```

---

## 3. Prerequisites

You need the following installed:

- **Node.js** 18 or higher
- **npm** 9 or higher
- **Git**

Verify with:

```bash
node --version
npm --version
git --version
```

You also need free accounts on:

- [Google AI Studio](https://aistudio.google.com/app/apikey) — Gemini API
- [Resend](https://resend.com/) — Email delivery
- [Sentry](https://sentry.io/) — Error tracking
- [Render](https://render.com/) — Deployment
- [GitHub](https://github.com/) — Code hosting

---

## 4. Free API Keys Setup

### 4.1 Google Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the key
5. Save it as `GEMINI_API_KEY`

### 4.2 Resend API Key

1. Go to https://resend.com and sign up
2. Verify your email address
3. Go to **API Keys** → **Create API Key**
4. Copy the key
5. Save it as `RESEND_API_KEY`

### 4.3 Sentry DSN

1. Go to https://sentry.io and sign up
2. Create a new project:
   - Platform: **Node.js**
   - Name: `supportpilot`
3. On the "Configure SDK" page, copy the DSN URL
4. Save it as `SENTRY_DSN`

The DSN looks like:

```
https://abc123def456@xyz123.ingest.sentry.io/1234567
```

---

## 5. Local Setup

### Step 1: Open the project folder

```bash
cd "H:/Abubakar/ai-internship/final project"
```

### Step 2: Install backend dependencies

```bash
npm install
```

### Step 3: Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### Step 4: Create environment file

```bash
cp .env.example .env
```

Open `.env` in any text editor and add your keys:

```env
PORT=3000
NODE_ENV=development

GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash

RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev

BUSINESS_NAME=SupportPilot
BUSINESS_WEBSITE=https://supportpilot.example.com
SUPPORT_EMAIL=support@example.com
SYSTEM_PROMPT="You are a helpful customer support agent for SupportPilot. Be friendly, concise, and professional. Answer questions about our AI customer support product, pricing, features, and how it helps small businesses. If you don't know something, offer to escalate to a human agent."

SENTRY_DSN=your_sentry_dsn_here
```

> You can run the app without keys. It will return fallback messages, but AI responses and real emails will not work.

### Step 5: Build the frontend

```bash
npm run build:frontend
```

This creates production frontend files in `frontend/dist`.

---

## 6. Running Locally

### Option A: Backend only (serves frontend + API)

```bash
npm run start:dev
```

Open your browser:

- Web app: http://localhost:3000
- Swagger docs: http://localhost:3000/api/docs
- Health check: http://localhost:3000/health

### Option B: Frontend dev server separately

In one terminal, start the backend:

```bash
npm run start:dev
```

In another terminal, start the frontend dev server:

```bash
cd frontend
npm run dev
```

Open http://localhost:5173

The frontend dev server proxies API calls to http://localhost:3000 automatically.

### Option C: Production mode locally

```bash
npm run build:all
npm run start:prod
```

This builds both frontend and backend, then starts the production server.

---

## 7. Testing Everything

### 7.1 Health Check

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2026-08-24T...",
  "uptime": 12.34
}
```

### 7.2 Get Business Profile

```bash
curl http://localhost:3000/settings
```

### 7.3 Chat with AI

```bash
curl -X POST http://localhost:3000/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "What pricing plans do you offer?"}'
```

If `GEMINI_API_KEY` is set, you get a real AI response based on your `SYSTEM_PROMPT`.

### 7.4 List AI Models

```bash
curl http://localhost:3000/chat/models
```

### 7.5 Send Test Email

```bash
curl -X POST http://localhost:3000/email/send-test \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

### 7.6 Send Custom Email

```bash
curl -X POST http://localhost:3000/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Support follow-up",
    "text": "Thanks for reaching out. Here is the information.",
    "html": "<p>Thanks for reaching out.</p>"
  }'
```

### 7.7 Send Chat Summary Email

```bash
curl -X POST http://localhost:3000/email/chat-summary \
  -H "Content-Type: application/json" \
  -d '{
    "to": "support@example.com",
    "messages": [
      {"role": "user", "text": "Do you offer a free plan?"},
      {"role": "bot", "text": "Yes, our free plan includes 100 replies per month."}
    ]
  }'
```

### 7.8 Trigger Sentry Test Error

```bash
curl http://localhost:3000/health/sentry-test
```

This returns a 500 error. If `SENTRY_DSN` is set, the error appears in your Sentry dashboard under **Issues**.

### 7.9 Swagger UI

Open http://localhost:3000/api/docs

You can test all endpoints directly from the browser.

### 7.10 Run Automated Tests

```bash
npm test
```

Expected output:

```text
Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
```

### 7.11 Test the Web UI

1. Open http://localhost:3000
2. Explore the landing page
3. Click **Try Live Demo** or **Launch Demo**
4. In the **Live Chat** tab, send a message
5. Use the **Email Summary** box to send a transcript
6. In the **Email Test** tab, send a test email
7. In the **Status & API** tab, trigger a Sentry error
8. In the **Business Profile** tab, review your configured profile

---

## 8. Deployment on Render

### Step 1: Push code to GitHub

```bash
git init
git add .
git commit -m "initial: SupportPilot AI customer support agent"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/supportpilot.git
git push -u origin main
```

### Step 2: Create a Render account

1. Go to https://render.com
2. Sign up with GitHub

### Step 3: Create a new Web Service

1. Go to the Render Dashboard
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Use these settings:

| Setting | Value |
|---------|-------|
| Name | `supportpilot` |
| Runtime | Node |
| Build Command | `npm install && cd frontend && npm install && cd .. && npm run build:all` |
| Start Command | `npm run start:prod` |
| Plan | Free |

5. Add environment variables:

```
NODE_ENV=production
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
BUSINESS_NAME=SupportPilot
BUSINESS_WEBSITE=https://supportpilot.example.com
SUPPORT_EMAIL=support@example.com
SYSTEM_PROMPT=your_custom_prompt
SENTRY_DSN=your_sentry_dsn
```

6. Click **Deploy Web Service**

After deployment, your app will be live at:

```
https://supportpilot-xxx.onrender.com
```

And Swagger docs at:

```
https://supportpilot-xxx.onrender.com/api/docs
```

> Render free tier puts the server to sleep after inactivity. The first request after sleep may take 30–60 seconds.

---

## 9. Deployment on Vercel (Free Tier)

If Render asks for a debit/credit card, Vercel is a good free alternative.

### Limitations

- Serverless functions have a **10-second timeout** on the free Hobby plan
- Cold starts can add 1–3 seconds to the first request
- Best for demos and low-traffic sites

### Steps

1. Push this repo to GitHub
2. Go to https://vercel.com and sign up with GitHub
3. Click **Add New Project**
4. Import your GitHub repository
5. Use these settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Other |
| Install Command | `npm install` |
| Build Command | `npm run build:vercel` |
| Output Directory | Leave empty |

6. Add environment variables:

```
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
BUSINESS_NAME=SupportPilot
BUSINESS_WEBSITE=https://supportpilot.example.com
SUPPORT_EMAIL=support@example.com
SYSTEM_PROMPT=your_custom_prompt
SENTRY_DSN=your_sentry_dsn
```

7. Click **Deploy**

Your app will be live at:

```
https://supportpilot-xxx.vercel.app
```

The `api/index.ts` serverless function handles all API routes and serves the React frontend from `frontend/dist`.

> Use **Install Command:** `npm install` and **Build Command:** `npm run build:vercel`.

---

## 10. Deployment with Docker

### Build the image

```bash
docker build -t supportpilot .
```

### Run the container

```bash
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  -e RESEND_API_KEY=your_key \
  -e SENTRY_DSN=your_dsn \
  -e BUSINESS_NAME=SupportPilot \
  -e SUPPORT_EMAIL=support@example.com \
  -e SYSTEM_PROMPT="your prompt" \
  supportpilot
```

Or use an env file:

```bash
docker run -p 3000:3000 --env-file .env supportpilot
```

Open http://localhost:3000

---

## 11. Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| `PORT 3000 already in use` | Another app is using port 3000 | Change `PORT` in `.env` to `3001` |
| Blank page at `/` | Frontend not built | Run `npm run build:frontend` |
| AI returns fallback message | `GEMINI_API_KEY` missing or invalid | Check your Gemini key |
| Email not sent | `RESEND_API_KEY` missing or recipient not verified | Use your own verified email |
| Sentry shows no errors | `SENTRY_DSN` missing or incorrect | Copy the full DSN from Sentry |
| Build fails | Dependency issue | Delete `node_modules` and run `npm install` |
| `npm install` is slow | Network or large dependencies | Wait or use a faster network |
| Frontend shows old version | Build cache | Run `npm run build:all` again |
| Chat feels generic | `SYSTEM_PROMPT` not customized | Update `SYSTEM_PROMPT` in `.env` |

---

## 12. Demo Recording Checklist

Your demo video should clearly show:

- [ ] SupportPilot landing page and branding
- [ ] Project structure and code explanation
- [ ] Backend running locally or on Render
- [ ] Frontend chat UI with AI responses
- [ ] Business profile settings
- [ ] Email conversation summary sent via Resend
- [ ] Swagger UI testing (`/api/docs`)
- [ ] Sentry error tracking via `/health/sentry-test`
- [ ] Brief explanation of what you built and what you learned

---

## 13. LinkedIn Post Template

You can use this as a starting point for your LinkedIn post:

```
🚀 Just launched SupportPilot — an AI-powered customer support agent for small businesses — as part of the AI Automation Internship Program by DaFi Labs × EmpRadar.ai!

What I built:
• React + Vite frontend with a premium chat UI
• NestJS backend with REST APIs
• Google Gemini AI integration for instant support replies
• Resend email automation for conversation summaries
• Swagger API documentation
• Sentry error tracking & monitoring
• One-click deployment on Render

The problem it solves:
Small businesses lose leads because they can't respond to website visitors 24/7. SupportPilot answers questions instantly and emails the conversation to the team.

What I learned:
• How to build a production-ready full-stack AI product
• How to integrate AI, email, docs, and monitoring into one app
• How to deploy a complete app on Render's free tier

🔗 GitHub: [your-repo-link]
🔗 Live Demo: [your-render-link]

#AI #CustomerSupport #NestJS #React #Vite #Gemini #Resend #Sentry #Swagger #FullStack #Internship #DaFiLabs #EmpRadar
```

---

## 14. Free Tier Limits

| Service | Free Tier | Limit |
|---------|-----------|-------|
| Google Gemini | Google AI Studio | ~1,500 requests/day |
| Resend | Free plan | 100 emails/day, verified recipients only |
| Sentry | Developer plan | 5,000 errors/month |
| Render | Web Service Free | 512 MB RAM, sleeps after inactivity |
| Vercel | Hobby Plan | Serverless functions, 10s timeout |

### Important note about Resend

On the free plan, you can only send emails to:

- Your own verified email address
- Emails on a domain you own and verify

For the demo, send emails to your own inbox. To send to customers, add and verify a custom domain in Resend.

---

## Quick Start Summary

```bash
# 1. Install dependencies
npm install
cd frontend && npm install && cd ..

# 2. Configure env
cp .env.example .env
# edit .env with your keys and business profile

# 3. Build frontend
npm run build:frontend

# 4. Start server
npm run start:dev

# 5. Open browser
# http://localhost:3000
```

---

If anything does not work, check the server logs in the terminal. They usually tell you exactly which key or file is missing.
