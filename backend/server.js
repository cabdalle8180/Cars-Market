// import express from "express"
// import dotenv from "dotenv"
// import ConnectDB from "./config/config.js"
// import userRoutes from './routes/user.routes.js'
// import authRoutes from './routes/auth.routes.js'
// import cookieParser from "cookie-parser";
// import listingRoutes from './routes/listing.routes.js'
// import path from "path";

// dotenv.config()
// const __dirname = path.resolve();
// const server = express()

// // CORS configuration
// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

// server.use(express.json())
// server.use(cookieParser());
// ConnectDB()

// server.use('/api/user', userRoutes)
// server.use('/api/auth', authRoutes)
// server.use('/api/listing', listingRoutes)

// server.use(express.static(path.join(__dirname, "../frontend/dist")));
// server.get("/*", (req,res)=>{
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// })

// const PORT = process.env.PORT || 3000
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })


// // midware

// server.use((err,req,res,next)=>{
//   const statusCode= err.statusCode || 500;
//   const message= err.message || "internal server error";
//   return res.status(statusCode).json({
//     success:false,
//     statusCode,
//     message
//   })
// })



import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/config.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const server = express();
const __dirname = path.resolve();

/* =====================
   MIDDLEWARES
===================== */

server.use(express.json());
server.use(cookieParser());

// CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

/* =====================
   DATABASE
===================== */

ConnectDB();

/* =====================
   API ROUTES
===================== */

server.use("/api/user", userRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/listing", listingRoutes);

/* =====================
   FRONTEND (VITE / REACT)
===================== */

const frontendPath = path.join(__dirname, "../frontend/dist");
server.use(express.static(frontendPath));

// ✅ CATCH-ALL (EXPRESS v5 SAFE)
server.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* =====================
   ERROR HANDLER
===================== */

server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

/* =====================
   START SERVER
===================== */

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
