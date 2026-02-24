import express from "express";
import cors from "cors";
import playlistRoutes from "./routes/playlist.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= CORS CONFIG ================= */
app.use(
  cors({
    origin: true,              // ✅ allow all origins dynamically
    credentials: true,         // ✅ allow cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ handle preflight requests properly
app.options("*", cors());

/* ================= Middleware ================= */
app.use(express.json());

/* ================= Routes ================= */
app.use("/api/playlist", playlistRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Server running (Demo Mode)" });
});

/* ================= Start Server ================= */
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});