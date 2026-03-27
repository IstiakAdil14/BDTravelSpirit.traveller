# BD Travel Spirit — Traveller Portal

🌐 **Live Demo:** [https://bd-travel-spirit-traveller-q26s.vercel.app](https://bd-travel-spirit-traveller-q26s.vercel.app)

A full-stack travel booking platform for exploring Bangladesh, built with Next.js 16, React 19, MongoDB, and NextAuth.

---

## Features

- Browse and book tours across Bangladesh's regions and destinations
- Traveller dashboard with bookings, reviews, inbox, and activity tracking
- Authentication with NextAuth (credentials + OAuth)
- OTP-based email verification
- Tour operator profiles and listings
- Cloudinary image hosting
- Responsive UI with Tailwind CSS, Radix UI, and Framer Motion
- Real-time inbox via Socket.IO

---

## Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Framework    | Next.js 16 (App Router)                 |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS v4, Radix UI, shadcn/ui    |
| Database     | MongoDB + Mongoose                      |
| Auth         | NextAuth v4                             |
| State        | Zustand, TanStack Query                 |
| Images       | Cloudinary                              |
| Email        | Nodemailer                              |
| Animation    | Framer Motion                           |
| Maps         | Mapbox GL                               |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account
- SMTP email credentials

### Installation

```bash
git clone https://github.com/IstiakAdil14/BDTravelSpirit.traveller.git
cd BDTravelSpirit.traveller
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# MongoDB
MONGODB_URI=<your_mongodb_connection_string>

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your_nextauth_secret>

# OAuth (optional)
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

# Email (Nodemailer)
EMAIL_HOST=<smtp_host>
EMAIL_PORT=587
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command               | Description                        |
|-----------------------|------------------------------------|
| `npm run dev`         | Start development server           |
| `npm run build`       | Build for production               |
| `npm run start`       | Start production server            |
| `npm run lint`        | Run ESLint                         |
| `npm run test`        | Run Jest tests                     |
| `npm run seed`        | Seed the database                  |

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── api/              # REST API endpoints
│   ├── auth/             # Auth pages (login, signup, verify)
│   ├── dashboard/        # Traveller / admin / guide dashboards
│   ├── tours/            # Tour listing and detail pages
│   ├── destinations/     # Destination pages
│   └── operators/        # Tour operator pages
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components
│   ├── tours/            # Tour components
│   ├── layout/           # Header, footer, sidebar
│   └── ui/               # shadcn/ui base components
├── models/               # Mongoose models
├── lib/                  # Utilities, auth config, DB connection
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── constants/            # App-wide constants
```

---

## License

This project is for academic/final year project purposes.
