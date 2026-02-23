import express from "express";
import cors from "cors";
import playlistRoutes from "./routes/playlist.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= Middleware ================= */
app.use(cors());
app.use(express.json());

/* ================= Routes ================= */
app.use("/api/playlist", playlistRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Server running (Demo Mode)" });
});

/* ================= Start Server ================= */
app.listen(PORT, () => {
  console.log(`✅ Demo server running on http://localhost:${PORT}`);
});