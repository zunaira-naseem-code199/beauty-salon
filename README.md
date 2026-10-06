# 💄 Beauty Grace Parlor

A full-stack MERN website for a beauty parlour: a luxury-style landing page, online booking with live time slots, and an admin dashboard to manage bookings and content.

> Sample project. Contact details, prices, reviews and photos are placeholder data.

## 🌐 Live Demo
- **Frontend (Vercel):** [LIVE_LINK](https://beauty-salon-black-eight.vercel.app)
- **Backend (Railway):** [BACKEND_LINK](https://beauty-salon-production-c26e.up.railway.app)

## ✨ Features
- Responsive landing page: services, about, gallery with lightbox, reviews, contact map, WhatsApp and click-to-call buttons
- Booking form with live 30-minute slots, past times hidden, double booking blocked
- Admin dashboard (`/admin`) with JWT login:
  - Manage bookings: filter, search, confirm or cancel, WhatsApp the client
  - Manage services, gallery photos and reviews (image upload optional)
  - Change password
- Optional email notifications (owner and customer)
- Security: helmet, rate limiting, bcrypt, input validation

## 🛠 Tech Stack
**Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Router  
**Backend:** Node.js, Express, Mongoose, JWT  
**Database:** MongoDB Atlas  
**Optional:** Nodemailer (email), Cloudinary (uploads)

## 🚀 Run Locally
Requires Node.js 18+ and a free [MongoDB Atlas](https://www.mongodb.com/atlas) database.

```bash
git clone https://github.com/zunaira-naseem-code199/beauty-salon.git
cd beauty-salon
```

**Backend**
```bash
cd server
cp .env.example .env     # Windows: copy .env.example .env
# edit .env (see below)
npm install
npm run seed             # creates admin, services, gallery, reviews
npm run dev              # http://localhost:5000
```

**Frontend** (new terminal)
```bash
cd client
npm install
npm run dev              # http://localhost:5173
```

Admin dashboard: `http://localhost:5173/admin` (login with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`).

## 🔑 Environment Variables (`server/.env`)
| Variable | Description |
| --- | --- |
| `MONGODB_URI` | Atlas connection string (include the database name before `?`) |
| `JWT_SECRET` | Long random string for signing login tokens |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin account created by `npm run seed` |
| `CLIENT_URL` | Frontend URL (default `http://localhost:5173`) |
| `SMTP_*`, `OWNER_EMAIL`, `MAIL_FROM` | Optional email notifications |
| `CLOUDINARY_*` | Optional image uploads |

Production frontend only: `VITE_API_URL` = your backend URL ending in `/api`.

> If Atlas gives a DNS error (`queryTxt ETIMEOUT`), use the **Legacy URI String** option in Atlas > Connect.

## ☁️ Deployment
- **Backend (Railway):** root directory `server`, start command `npm start`. Add the `.env` values as variables, plus `NODE_ENV=production` and `CLIENT_URL` set to the Vercel URL.
- **Frontend (Vercel):** root directory `client`, framework Vite. Add `VITE_API_URL` and a `vercel.json` rewrite so `/admin` works on refresh.

## 📁 Structure
```
client/   React app (components, pages, admin, lib/config.js)
server/   Express API (models, routes, middleware, seed.js)
```
Business details (phone, address, map) are in `client/src/lib/config.js`.

## 👩‍💻 Author
[zunaira-naseem-code199](https://github.com/zunaira-naseem-code199)