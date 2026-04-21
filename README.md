# 🏟️ TURFI – Real-Time Sports Turf Discovery, Booking & Management Platform (MERN Stack)

**TURFI** is a full-stack turf booking application built using the **MERN stack**. It supports real-time slot booking, role-based login (User, Owner, Admin), turf verification, and a powerful admin dashboard. Designed with **Tailwind CSS** and managed using **Redux Toolkit**, TURFI also integrates **Contentful CMS** for content management.

---

## 🚀 Features

### 👤 User Panel
- Secure registration and login
- Explore available turfs with details
- Book turf slots in real-time
- View booking history and upcoming reservations
- Check turf usage and availability status

### 🧑‍💼 Owner Panel
- Login to manage owned turfs
- Submit turf verification documents
- View and manage turf bookings
- Dashboard with analytics and booking status

### 🛡️ Admin Panel
- Admin dashboard with access control
- Approve/reject turf verification requests
- Grant login access to owners
- Platform moderation and role-based permissions

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **CMS**: Contentful Content API
- **State Management**: Redux Toolkit

---



## 🔐 Role-based Login Access

| Role    | Permissions |
|---------|-------------|
| **User**   | Book slots, view turf info, check usage |
| **Owner**  | Submit turf documents, manage bookings |
| **Admin**  | Verify owners, approve turf listings, manage access |

---
# 🛠️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/turfi.git
cd turfi

## 2. .env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

REACT_APP_CONTENTFUL_SPACE_ID=your_space_id
REACT_APP_CONTENTFUL_ACCESS_TOKEN=your_access_token


3. Install Dependencies
# Backend
cd server
npm install

# Frontend
cd ../client
npm install


# Start backend server
cd server
npm run dev

# Start frontend
cd ../client
npm start
✅ Completed Features
✅ Real-time slot booking

✅ Role-based authentication (User / Owner / Admin)

✅ Admin dashboard for verification and moderation

✅ Turf analytics and availability

✅ Redux-based state management

✅ Tailwind CSS for responsive UI

✅ Contentful API integration for content management

✅ Fully completed and tested 💯

📢 Future Improvements
🔗 Payment gateway integration (e.g., Razorpay, Stripe)

🔔 Email & SMS notifications

⭐ Turf reviews and ratings

🗺️ Google Maps turf location


📄 License
This project is licensed under the MIT License.

🤝 Contributing
Contributions are welcome!
Feel free to open issues or submit a pull request to help improve the project.

👨‍💻 Developer
Aditya Nishad

