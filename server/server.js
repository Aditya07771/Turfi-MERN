import express from 'express';
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';
import authRouter from "./routes/authRoutes.js"
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';

const app = express();
const port = process.env.PORT || 9000;
connectDB();

// CORS Configuration
// Update the CORS methods to include PATCH
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Added PATCH
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));