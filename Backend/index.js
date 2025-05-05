import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const clientUrl = process.env.CLIENT_URL?.trim();
console.log("✅ CLIENT_URL permitido:", clientUrl);

app.disable("x-powered-by");

app.use(cors({
    origin: (origin, callback) => {
        console.log("🔥 Origin recibido:", origin);
        if ((!origin && process.env.NODE_ENV === "development") || origin === clientUrl) {
            callback(null, true);
        }
        else {
            console.log("❌ Origin no permitido:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("🚀 Server is running on port:", PORT);
        });
    })
    .catch((err) => {
        console.error("❌ Error al conectar a la base de datos:", err);
        process.exit(1);
    });

