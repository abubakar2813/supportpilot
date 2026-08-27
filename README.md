# ✈ SupportPilot

**AI-powered customer support agent for small businesses.**

SupportPilot answers your website visitors instantly, captures leads, and emails conversation summaries to your team — so you never lose a customer to slow response times again.

Built with **NestJS**, **React + Vite**, **Google Gemini**, **Resend**, **Swagger**, and **Sentry**.

> Built as part of the **AI Automation Internship Program by DaFi Labs × EmpRadar.ai**.

---

## 🚀 Features

- 🤖 **AI Customer Support Agent** powered by Google Gemini
- 💬 **Live chat widget** with professional UI
- 📧 **Email summaries** of customer conversations via Resend
- ⚙️ **Business profile** configuration (company name, website, support email, AI prompt)
- 📚 **Swagger API documentation**
- 🐛 **Sentry error tracking & monitoring**
- 🛡️ **Security:** Helmet, CORS, compression, rate limiting, input validation
- 🐳 **Docker, Render & Vercel deployment ready**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | NestJS |
| AI Model | Google Gemini (`gemini-1.5-flash`) |
| Email | Resend |
| API Docs | Swagger / OpenAPI |
| Monitoring | Sentry |
| Language | TypeScript / JavaScript |
| Deployment | Render / Vercel (free tier) |

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

Free accounts on:

- [Google AI Studio](https://aistudio.google.com/app/apikey) (Gemini API key)
- [Resend](https://resend.com/) (API key)
- [Sentry](https://sentry.io/) (DSN)
- [Render](https://render.com/) (deployment)
- [GitHub](https://github.com/) (repository)

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/supportpilot.git
cd supportpilot

# 2. Install backend dependencies
npm install

# 3. Install frontend dependencies
cd frontend && npm install && cd ..

# 4. Configure environment variables
cp .env.example .env
# Edit .env with your API keys and business profile
```

---

## 🔑 Environment Variables

Create a `.env` file from `.env.example`:

```env
PORT=3000
NODE_ENV=development

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash

RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev

BUSINESS_NAME=SupportPilot
BUSINESS_WEBSITE=https://supportpilot.example.com
SUPPORT_EMAIL=support@example.com
SYSTEM_PROMPT="You are a helpful customer support agent for SupportPilot..."

SENTRY_DSN=your_sentry_dsn
```

> ⚠️ **Never commit your `.env` file.** It is already added to `.gitignore`.

---

## ▶️ Running Locally

### Backend (serves frontend + API)

```bash
npm run build:frontend
npm run start:dev
```

Open http://localhost:3000

### Frontend dev server separately

```bash
# Terminal 1
npm run start:dev

# Terminal 2
cd frontend
npm run dev
```

Open http://localhost:5173

### Production mode locally

```bash
npm run build:all
npm run start:prod
```

---

## 📡 API Endpoints

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check API health |
| GET | `/health/sentry-test` | Trigger a test error for Sentry |

### Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/settings` | Get business profile settings |

### Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat/message` | Send a customer message to the AI |
| GET | `/chat/models` | List available Gemini models |

### Email

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/email/send` | Send a custom email via Resend |
| POST | `/email/send-test` | Send a test email |
| POST | `/email/chat-summary` | Email a conversation transcript |

---

## 🧪 Testing the Features

### 1. Chat with the AI agent

1. Open http://localhost:3000
2. Click **Launch Demo**
3. Go to the **Live Chat** tab
4. Type a customer question and press Send

### 2. Email a conversation summary

1. After chatting, enter a support email in the summary box
2. Click **Send Summary**
3. Check the inbox

### 3. Test Sentry error tracking

1. Go to **Status & API**
2. Click **Trigger Error**
3. Check your Sentry project Issues page

### 4. Test with Swagger

Open http://localhost:3000/api/docs and try all endpoints.

---

## 🧬 Project Structure

```
.
├── src/                          # NestJS backend
│   ├── modules/
│   │   ├── chat/                 # Chat API
│   │   ├── email/                # Email API
│   │   ├── settings/             # Business profile
│   │   └── health/               # Health + Sentry test
│   ├── common/                   # Filters, interceptors
│   ├── app.module.ts
│   └── main.ts
├── frontend/                     # React + Vite frontend
│   └── src/
│       ├── App.jsx               # Landing page + dashboard
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── test/                         # E2E tests
├── .env.example
├── Dockerfile
├── render.yaml
├── vercel.json
├── api/
│   └── index.ts                  # Vercel serverless entry
├── README.md
└── COMPLETE_GUIDE.md
```

---

## 🐳 Docker

```bash
# Build image
docker build -t supportpilot .

# Run container
docker run -p 3000:3000 --env-file .env supportpilot
```

Open http://localhost:3000

---

## 🌐 Deploy on Render (Free Tier)

1. Push this repo to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Use these settings:

| Setting | Value |
|---------|-------|
| Build Command | `npm install && cd frontend && npm install && cd .. && npm run build:all` |
| Start Command | `npm run start:prod` |
| Plan | Free |

6. Add environment variables from `.env.example`
7. Click **Deploy Web Service**

Your app will be live at `https://supportpilot-xxx.onrender.com`.

Swagger docs: `https://supportpilot-xxx.onrender.com/api/docs`

---

## ▲ Deploy on Vercel (Free Tier)

If Render asks for a card, Vercel is a good free alternative.

### Limitations

- Serverless functions have a **10-second timeout** on the free Hobby plan
- Cold starts can add 1–3 seconds to the first request
- Best for demos and low traffic

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

6. Add environment variables from `.env.example` in **Settings → Environment Variables**
7. Click **Deploy**

Your app will be live at `https://supportpilot-xxx.vercel.app`.

> The `api/index.ts` file handles all API routes and serves the React frontend from `frontend/dist`.
> 
> Use **Install Command:** `npm install` and **Build Command:** `npm run build:vercel`.

---

## 🐛 Sentry Error Tracking

1. Deploy the app with `SENTRY_DSN` set
2. Call `GET /health/sentry-test` or click **Trigger Error** in the dashboard
3. Go to your Sentry project → **Issues**

---

## 📹 Demo Recording Checklist

Your demo video should show:

- [ ] SupportPilot landing page
- [ ] Live chat UI with AI responses
- [ ] Email conversation summary sent via Resend
- [ ] Swagger API testing
- [ ] Sentry error tracking dashboard
- [ ] Brief explanation of the project and what you learned

---

## 📄 License

This project is for educational purposes as part of the AI Automation Internship.

---

## 🙋 Need Help?

1. Check your `.env` variables
2. Check the server logs for error messages
3. Verify your API keys are valid
4. Make sure Resend recipient emails are verified (free tier limitation)

For the full guide, see `COMPLETE_GUIDE.md`.
