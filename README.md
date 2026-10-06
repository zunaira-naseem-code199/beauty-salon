# Beauty Grace Parlor (MERN)

Luxury beauty parlour website with online booking and an admin dashboard.

- **client/**: React + Vite + Tailwind CSS (installed, not CDN) + Framer Motion + React Router
- **server/**: Node.js + Express + MongoDB (Mongoose) + JWT admin login

## Features
**Website:** hero, services, about, gallery with lightbox, reviews, booking form with live free time slots, contact with map and WhatsApp/call buttons.
Services, gallery and reviews load from the database (built-in defaults show if the server is offline).

**Booking:** 30-minute slots from 10:00 to 19:30, past times hidden, taken slots disabled, double booking blocked (also at database level). Optional email for a confirmation message.

**Admin (`/admin`):** appointments with Today/Upcoming/Pending views, search, status changes, WhatsApp/call buttons, card layout on phones; manage services, gallery photos and reviews (with image upload); change password.

**Security:** helmet, rate limits (login, booking, general), JWT auth, input validation.

**Notifications (optional):** email to the owner on each new booking, and to the client when an email is given and when the booking is confirmed or cancelled.

## Run locally
Node.js 18+ and a free MongoDB Atlas database are required.

```
# terminal 1: backend
cd server
copy .env.example .env      # Mac/Linux: cp .env.example .env
# fill in .env (see below)
npm install
npm run seed                # admin user (if missing), services, gallery, reviews
npm run dev                 # http://localhost:5000

# terminal 2: frontend
cd client
npm install
npm run dev                 # http://localhost:5173
```
Admin: http://localhost:5173/admin. Reset the admin password from `.env` with `npm run seed -- --reset-admin`.

## .env
Required: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`. `TIMEZONE` defaults to `Asia/Karachi`.

**Email (optional).** For Gmail: turn on 2-Step Verification, create an App Password at myaccount.google.com/apppasswords, then set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER=<your gmail>`, `SMTP_PASS=<app password>`, `MAIL_FROM`, and `OWNER_EMAIL` (where new-booking alerts go). Leave blank to disable.

**Image upload (optional).** Create a free Cloudinary account, open the dashboard, and copy the cloud name, API key and API secret into `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Without them, paste image URLs in the admin forms instead.

## API
| Method | Route | Access |
| --- | --- | --- |
| POST | /api/auth/login | public |
| POST | /api/auth/change-password | admin |
| GET | /api/services, /api/gallery, /api/reviews | public (active only) |
| GET | /api/{services,gallery,reviews}/all | admin |
| POST/PUT/DELETE | /api/{services,gallery,reviews}[/:id] | admin |
| GET | /api/appointments/slots?date=YYYY-MM-DD | public |
| POST | /api/appointments | public |
| GET/PATCH/DELETE | /api/appointments[/:id] | admin |
| POST | /api/uploads | admin |

## Deploying
Set `NODE_ENV=production`, a new strong `JWT_SECRET`, `CLIENT_URL` (your site URL) on the server, and `VITE_API_URL` (your API URL ending in `/api`) when building the client.
