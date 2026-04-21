<div align="center">

<br />

<h1 style="font-size: clamp(3.5rem, 8vw, 7rem); line-height: 1; margin: 0; font-weight: 900;">
  ⚽ TURFI
</h1>

<h3 style="font-size: clamp(1rem, 2vw, 1.5rem); margin-top: 0.75rem;">
  Real-Time Sports Turf Discovery, Booking & Management Platform
</h3>

<br />

<em>Discover. Book. Play.</em>

<br />

</div>
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)](https://developers.google.com/maps)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://razorpay.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

<br />

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active%20Development-blue?style=flat-square)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-orange?style=flat-square)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [System Architecture](#-system-architecture)
- [Features & Implementation](#-features--implementation)
- [Tech Stack](#-tech-stack)
- [Advanced Concepts](#-advanced-concepts)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

## 🌟 Overview

**TURFI** is a full-stack, real-time, location-aware sports turf booking platform built on the MERN stack. It bridges the gap between players looking for sports grounds and turf owners managing their facilities — creating a digital ecosystem where **discovery, booking, communication, and trust** all live in one place.

> This is not a CRUD app. It is a startup-grade product demonstrating real-world engineering: concurrency handling, event-driven architecture, geospatial queries, real-time sync, payment lifecycles, and multi-role access control.

### 👤 For Players
```
Search → Discover → Book → Pay → Play
```

### 🧑‍💼 For Owners
```
List Turf → Manage Schedule → Communicate → Earn
```

### 🛡️ For Admins
```
Verify → Moderate → Analyse → Control
```

---

## 🎯 Problem Statement

| Pain Point | TURFI's Solution |
|---|---|
| Manual / phone-based bookings | Instant online booking with real-time slot availability |
| No visibility into availability | Live WebSocket-powered slot sync — no double bookings |
| Opaque pricing | Transparent pricing with filters and comparisons |
| Fake or unverified listings | Admin verification system with trust badges |
| No centralized discovery | Location-based search powered by Google Maps & MongoDB `$near` |
| No owner-player communication | Built-in real-time chat with typing indicators |

---

## 🧠 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│     React.js + Redux Toolkit + TailwindCSS + TanStack Query      │
└──────────────────┬──────────────────────────┬───────────────────┘
                   │  REST APIs (JWT Auth)     │  WebSocket (Socket.IO)
                   ▼                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SERVER LAYER (Node.js + Express)             │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐  ┌──────────┐ │
│  │ Auth Routes│  │Turf Routes │  │Booking Routes│  │Chat/WS   │ │
│  │ (JWT/RBAC) │  │(Geo + CRUD)│  │(Pay + Slots) │  │(Socket.IO│ │
│  └────────────┘  └────────────┘  └─────────────┘  └──────────┘ │
└────┬─────────────────┬──────────────────┬──────────────────┬────┘
     │                 │                  │                  │
     ▼                 ▼                  ▼                  ▼
 MongoDB         Cloudinary           Razorpay           Redis +
 (Geo Index)     (Media CDN)         (Payments)          BullMQ
                                                       (Background
                                                         Workers)
                         │
                         ▼
                 Google Maps API
                (Geocoding + Display)
```

### Three-Role System

```
PLAYER     →  Search | Book | Chat | Review | Pay
OWNER      →  List | Schedule | Chat | Analytics | Refund
ADMIN      →  Verify | Moderate | Dispute | Platform Stats
```

---

## ⚡ Features & Implementation

### 1. 🔄 Real-Time Slot Availability

**What it does:** Shows live slot availability; prevents double-bookings across concurrent users.

**How it's implemented:**
- **Socket.IO** room-based architecture: each turf has its own socket room (`turf:{id}`)
- When a user starts the booking flow, a **slot lock** is acquired (stored in Redis with a TTL of ~5 minutes)
- All clients in the turf room receive an instant `slot:locked` or `slot:confirmed` event
- If payment fails or session expires, the lock is released and slots re-open in real-time

```js
// Server-side slot locking
io.on("connection", (socket) => {
  socket.on("lock:slot", async ({ turfId, slotId, userId }) => {
    const lockKey = `lock:${turfId}:${slotId}`;
    const locked = await redis.set(lockKey, userId, "EX", 300, "NX");
    if (locked) {
      io.to(`turf:${turfId}`).emit("slot:locked", { slotId });
    } else {
      socket.emit("slot:unavailable", { slotId });
    }
  });
});
```

> **Concepts demonstrated:** Concurrency control, distributed locking (Redis), real-time event propagation

---

### 2. 📍 Geo-Based "Near Me" Turf Search

**What it does:** Finds turfs near the user's current location and sorts by distance, price, and rating.

**How it's implemented:**
- Turf locations are stored as **GeoJSON Point** objects in MongoDB
- **2dsphere index** is created on the `location` field for performant geospatial queries
- The frontend requests the user's coordinates via the **Geolocation API**, then passes them to the backend
- **Google Maps API** is used to render turf pins, display routes, and show autocomplete for location search

```js
// MongoDB geospatial query
const turfs = await Turf.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [lng, lat] },
      $maxDistance: radiusInMeters,
    },
  },
  isVerified: true,
}).populate("owner", "name avatar");
```

```js
// Turf schema with geospatial index
const turfSchema = new Schema({
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
});
turfSchema.index({ location: "2dsphere" });
```

> **Concepts demonstrated:** MongoDB geospatial indexing, Google Maps integration, browser Geolocation API

---

### 3. 💬 WebSocket Real-Time Chat

**What it does:** Enables direct messaging between players and owners for inquiries, negotiation, and support.

**How it's implemented:**
- Socket.IO **private rooms** per conversation (`chat:{userId1}:{userId2}`)
- Messages are persisted in MongoDB with `readStatus`, `deliveredAt`, and `seenAt` fields
- **Typing indicators** broadcast via `user:typing` and `user:stop-typing` events with a debounce
- On reconnect, Socket.IO auto-joins the user back to their active rooms using stored session data
- Chat history is fetched via REST on initial load; subsequent messages arrive over the socket

```js
socket.on("message:send", async (data) => {
  const message = await Message.create(data);
  io.to(data.roomId).emit("message:receive", message);
});

socket.on("typing:start", ({ roomId }) => {
  socket.to(roomId).emit("user:typing");
});
```

> **Concepts demonstrated:** Event-driven architecture, persistent socket sessions, message delivery guarantees

---

### 4. 🧠 Smart Turf Recommendation Engine

**What it does:** Surfaces the most relevant turfs based on user context and behavior.

**How it's implemented:**
- **Rule-based engine** using a weighted scoring formula:

```
score = (1/distance × 0.4) + (avgRating × 0.35) + (priceScore × 0.25)
```

- **User history** (viewed turfs, booked turfs, preferred sports) is tracked in the user document
- Recommendations are refreshed on each session using an aggregation pipeline
- Architecture is designed to be **swapped with an ML model** (collaborative filtering) later without changing the API contract

```js
const recommended = await Turf.aggregate([
  { $geoNear: { near: userLocation, distanceField: "dist.calculated", spherical: true }},
  { $addFields: { score: { $add: [
    { $multiply: [{ $divide: [1, "$dist.calculated"] }, 0.4] },
    { $multiply: ["$avgRating", 0.07] },
  ]}}},
  { $sort: { score: -1 } },
  { $limit: 10 },
]);
```

> **Concepts demonstrated:** MongoDB aggregation pipelines, scoring algorithms, extensible ML-ready design

---

### 5. 💳 Online Payment Integration (Razorpay)

**What it does:** Handles secure payment collection and confirmation, with refund and invoice support.

**How it's implemented:**
- **Order creation** on the server using Razorpay's Node SDK; order ID returned to frontend
- **Payment verification** using HMAC SHA-256 signature validation on the server — the booking is only confirmed after signature is verified
- **Webhooks** capture asynchronous payment events (success, failure, refund) from Razorpay
- On successful payment, a **booking record** is created and the slot lock is promoted to a confirmed booking
- Invoices are generated as PDFs using `pdfkit` and stored on Cloudinary

```js
// Server-side payment verification
const generatedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest("hex");

if (generatedSignature === razorpay_signature) {
  await Booking.findByIdAndUpdate(bookingId, { status: "confirmed" });
  io.to(`turf:${turfId}`).emit("slot:confirmed", { slotId });
}
```

> **Concepts demonstrated:** Payment lifecycle management, HMAC signature verification, webhook handling

---

### 6. 🔔 Notifications & Reminders

**What it does:** Delivers booking confirmations, upcoming match reminders, and cancellation alerts via in-app and email channels.

**How it's implemented:**
- **BullMQ** job queues (backed by Redis) handle all async notification dispatch
- A **scheduled job** runs 2 hours before each booking and sends a reminder
- In-app notifications are pushed via Socket.IO to the user's session room
- Email notifications use **Nodemailer** with HTML templates

```js
// Schedule a reminder job at booking time
await reminderQueue.add(
  "match-reminder",
  { userId, bookingId, turfName, slotTime },
  { delay: slotTime - Date.now() - 2 * 60 * 60 * 1000 } // 2h before
);

// Worker processes the job
reminderWorker.process(async (job) => {
  await sendEmail(job.data);
  io.to(`user:${job.data.userId}`).emit("notification:new", { ... });
});
```

> **Concepts demonstrated:** Background job queues, event scheduling, multi-channel notification systems

---

### 7. ✅ Owner Verification & Admin Approval

**What it does:** Owners submit documents (ownership proof, facility photos); an admin manually reviews and approves before the listing goes live.

**How it's implemented:**
- Documents and facility images are uploaded to **Cloudinary** via secure signed uploads
- A `verificationStatus` field (`pending | approved | rejected`) controls turf visibility
- Admins see a dedicated dashboard queue of pending verifications
- Approved turfs receive a **Trust Badge** (stored as a boolean flag) visible to all users

```js
// Turf model
verificationStatus: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending",
},
documents: [{ url: String, public_id: String, type: String }],
isTrusted: { type: Boolean, default: false },
```

> **Concepts demonstrated:** Multi-step admin workflows, role-based access control, Cloudinary secure upload

---

### 8. ⭐ Reviews, Ratings & Trust System

**What it does:** Post-booking reviews with star ratings; verified bookings unlock the ability to review.

**How it's implemented:**
- Reviews are only permitted after a **booking status is `completed`** — enforced server-side
- `avgRating` and `totalReviews` are maintained on the Turf document using MongoDB's `$avg` aggregation and a post-save hook
- Helpful votes on reviews surface the most useful content
- Flagging system routes suspicious reviews to admin moderation queue

```js
// Recompute average rating after each review
turfSchema.post("save", async function () {
  const stats = await Review.aggregate([
    { $match: { turf: this._id } },
    { $group: { _id: "$turf", avg: { $avg: "$rating" }, count: { $sum: 1 } }},
  ]);
  await Turf.findByIdAndUpdate(this._id, {
    avgRating: stats[0]?.avg ?? 0,
    totalReviews: stats[0]?.count ?? 0,
  });
});
```

> **Concepts demonstrated:** Post-save middleware, aggregation pipelines, trust signal systems

---

### 9. 📊 Analytics Dashboard

**What it does:** Gives owners insight into bookings, revenue, and peak hours; gives admins a platform-wide view.

**How it's implemented:**
- **Owner dashboard:** Revenue charts (daily/weekly/monthly), booking count, peak-hour heatmap
- **Admin dashboard:** Total platform GMV, new user signups, pending verifications, dispute rate
- All analytics are computed using MongoDB **aggregation pipelines** — no separate analytics DB required
- Charts are rendered with **Recharts** on the frontend; data is pre-aggregated server-side for performance

```js
// Peak hours aggregation
const peakHours = await Booking.aggregate([
  { $match: { turf: turfId, status: "completed" } },
  { $group: { _id: { $hour: "$slotStart" }, count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);
```

> **Concepts demonstrated:** Data aggregation, analytics API design, time-series visualization

---

### 10. 🔁 Cancellation, Refund & Dispute System

**What it does:** Handles booking cancellations with configurable refund policies, and a dispute resolution flow for admin.

**How it's implemented:**
- **Cancellation policy** is stored per turf (e.g., full refund > 24h before, 50% within 24h, no refund within 2h)
- On cancellation, a Razorpay refund is initiated programmatically via the API
- **Disputes** (raised when a player is denied entry, or a turf is misrepresented) are submitted with evidence and routed to admin
- Refund status is tracked and surfaced to the user in real-time via Socket events

```js
const policy = await Turf.findById(turfId).select("cancellationPolicy");
const hoursLeft = (booking.slotStart - Date.now()) / 3600000;
const refundPct = hoursLeft > 24 ? 1 : hoursLeft > 2 ? 0.5 : 0;
const refundAmount = booking.amountPaid * refundPct;

if (refundAmount > 0) {
  await razorpay.payments.refund(booking.paymentId, { amount: refundAmount * 100 });
}
```

> **Concepts demonstrated:** Business rule engines, payment refund APIs, dispute lifecycle management

---

## 🧰 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=flat-square) **Frontend** | React.js + Vite | UI framework, fast HMR |
| ![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&style=flat-square) **State** | Redux Toolkit + TanStack Query | Global state + server state/caching |
| ![Tailwind](https://img.shields.io/badge/-Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square) **Styling** | Tailwind CSS | Utility-first CSS |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat-square) **Runtime** | Node.js | JavaScript server runtime |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white&style=flat-square) **Framework** | Express.js | REST API server |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat-square) **Database** | MongoDB + Mongoose | Document DB, geospatial indexing |
| ![Socket.io](https://img.shields.io/badge/-Socket.io-010101?logo=socketdotio&logoColor=white&style=flat-square) **Real-Time** | Socket.IO | WebSocket communication |
| ![Redis](https://img.shields.io/badge/-Redis-DC382D?logo=redis&logoColor=white&style=flat-square) **Cache/Queue** | Redis + BullMQ | Slot locking, background jobs |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white&style=flat-square) **Media** | Cloudinary | Image/document storage & CDN |
| ![Google Maps](https://img.shields.io/badge/-Google%20Maps-4285F4?logo=googlemaps&logoColor=white&style=flat-square) **Maps** | Google Maps API | Geocoding, location display, directions |
| ![Razorpay](https://img.shields.io/badge/-Razorpay-02042B?logo=razorpay&logoColor=3395FF&style=flat-square) **Payments** | Razorpay | Payment gateway (INR support) |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white&style=flat-square) **Auth** | JWT + bcrypt | Stateless authentication |

---

## 🏗️ Advanced Concepts Used

```
✅ Real-Time Synchronization      →  Socket.IO rooms, slot locking via Redis
✅ Role-Based Access Control      →  User | Owner | Admin middleware guards
✅ Geospatial Querying            →  MongoDB 2dsphere index + $near operator
✅ Event-Driven Architecture      →  BullMQ queues for notifications and emails
✅ Concurrent Booking Prevention  →  Distributed Redis lock with TTL
✅ Secure Authentication          →  JWT access + refresh token rotation
✅ Payment Lifecycle Handling     →  Order → Verify → Confirm → Refund
✅ Scalable API Design            →  RESTful, versioned, paginated APIs
✅ Media Pipeline                 →  Cloudinary signed uploads, auto-optimization
✅ Analytics via Aggregations     →  MongoDB pipelines — no extra analytics service
```

---

## 📁 Project Structure

```
turfi/
├── client/                        # React frontend
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── Map/               # Google Maps integration
│   │   │   ├── Chat/              # Real-time chat UI
│   │   │   └── Booking/           # Slot picker, payment flow
│   │   ├── pages/
│   │   │   ├── User/              # Player-facing pages
│   │   │   ├── Owner/             # Owner dashboard
│   │   │   └── Admin/             # Admin panel
│   │   ├── store/                 # Redux slices
│   │   ├── hooks/                 # Custom React hooks
│   │   └── socket/                # Socket.IO client setup
│   └── package.json
│
├── server/                        # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/           # Route handler logic
│   │   ├── models/                # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Turf.js            # GeoJSON location field
│   │   │   ├── Booking.js
│   │   │   ├── Message.js
│   │   │   └── Review.js
│   │   ├── routes/                # Express route definitions
│   │   ├── middleware/            # Auth, RBAC, error handlers
│   │   ├── socket/                # Socket.IO event handlers
│   │   │   ├── chat.js
│   │   │   └── booking.js
│   │   ├── queues/                # BullMQ workers & jobs
│   │   │   ├── reminderQueue.js
│   │   │   └── emailQueue.js
│   │   ├── utils/                 # Helpers (geo, payment, cloudinary)
│   │   └── config/                # DB, Redis, Cloudinary config
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 18.x
npm >= 9.x
MongoDB Atlas or local MongoDB instance
Redis (local or Upstash)
Razorpay account (test keys)
Google Maps API key
Cloudinary account
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/turfi.git
cd turfi

# 2. Install server dependencies
cd server && npm install

# 3. Install client dependencies
cd ../client && npm install
```

### Running Locally

```bash
# Terminal 1 — Start Redis
redis-server

# Terminal 2 — Start the backend server
cd server
cp .env.example .env   # Fill in your environment variables
npm run dev

# Terminal 3 — Start the React frontend
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Environment Variables

### Server (`server/.env`)

```env
# App
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/turfi

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_SECRET=your_razorpay_secret

# Google Maps (server-side geocoding)
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user/owner |
| `POST` | `/api/auth/login` | Login, returns JWT pair |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `POST` | `/api/auth/logout` | Invalidate refresh token |

### Turfs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/turfs?lat=&lng=&radius=` | Geo-search nearby turfs |
| `GET` | `/api/turfs/:id` | Get turf details |
| `POST` | `/api/turfs` | Create turf listing (Owner) |
| `PUT` | `/api/turfs/:id` | Update turf (Owner) |
| `GET` | `/api/turfs/:id/slots?date=` | Get available slots |

### Bookings
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings` | Create booking + Razorpay order |
| `POST` | `/api/bookings/verify` | Verify payment signature |
| `GET` | `/api/bookings/my` | Get user's bookings |
| `POST` | `/api/bookings/:id/cancel` | Cancel with refund |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/turfs/pending` | Pending verifications |
| `PUT` | `/api/admin/turfs/:id/verify` | Approve/reject turf |
| `GET` | `/api/admin/stats` | Platform analytics |
| `GET` | `/api/admin/disputes` | All open disputes |

---

## 🖼️ Screenshots

> *(Coming soon — UI in active development)*

| Page | Description |
|---|---|
| 🗺️ **Discovery Map** | Google Maps view with turf pins, filter panel |
| 📅 **Slot Picker** | Calendar with real-time slot availability |
| 💬 **Chat Window** | Real-time owner-player messaging |
| 🧑‍💼 **Owner Dashboard** | Revenue charts, booking list, turf management |
| 🛡️ **Admin Panel** | Verification queue, dispute board, platform stats |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit changes
git commit -m "feat: add your feature description"

# 4. Push and open a PR
git push origin feature/your-feature-name
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using the MERN Stack

**TURFI** — *Discover. Book. Play.*

</div>
