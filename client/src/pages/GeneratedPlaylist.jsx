import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { moodConfig } from "../utils/moodConfig";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function GeneratedPlaylist() {
  const { state } = useLocation();

  const rawMood = state?.mood || "happy";
  const source = state?.source || "Mood Selection";
  const safeMood = rawMood.toLowerCase();

  const moodData =
    moodConfig[safeMood] || {
      label: safeMood,
      emoji: "🎵",
      textColor: "text-white",
    };

  const [playlistId, setPlaylistId] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= EMBED ================= */
  const embedSrc = useMemo(() => {
    if (!playlistId) return "";
    return `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`;
  }, [playlistId]);

  /* ================= GENERATE ================= */
  async function generatePlaylist() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/playlist/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: safeMood }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to generate playlist");

      setPlaylistId(data.playlistId);
      setConfidence(data.confidence);

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ================= INIT ================= */
  useEffect(() => {
    generatePlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeMood]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-indigo-500" />

      <div className="relative z-10">
        <Header step="Playlist Result" />
      </div>

      <div className="relative z-10 px-6 max-w-6xl mx-auto">

        {/* Mood Header */}
        <div className="mt-10 flex items-center gap-6">
          <div className="text-7xl">{moodData.emoji}</div>
          <div>
            <h1
              className={`text-7xl md:text-8xl font-extrabold ${moodData.textColor}`}
              style={{
                WebkitTextStroke: "2px black",
                textShadow: "0 4px 10px rgba(0,0,0,0.35)",
              }}
            >
              {moodData.label}
            </h1>

            <p className="mt-3 text-white/80 text-sm">
              Source: {source}
              {confidence && ` · ${confidence}% AI Confidence`}
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-black/40 text-white px-4 py-2 rounded-xl text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Player */}
        <div className="mt-8 bg-black/40 rounded-2xl p-4">
          {embedSrc ? (
            <>
              <iframe
                title="YouTube Player"
                src={embedSrc}
                width="100%"
                height="420"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="rounded-xl"
              />

              <div className="mt-4 flex justify-end">
                <a
                  href={`https://www.youtube.com/playlist?list=${playlistId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full
                    bg-red-600 hover:bg-red-700
                    text-white font-semibold
                    shadow-lg transition"
                >
                  ▶ Open in YouTube
                </a>
              </div>
            </>
          ) : (
            <div className="text-white/70 text-center py-20">
              {loading ? "Creating playlist..." : "No playlist available."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}