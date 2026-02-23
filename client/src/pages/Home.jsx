import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mood"); // 🔥 Go to Mood Selection instead of login
    }, 1500); // 1.5 second splash delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-emerald-400 via-cyan-500 to-indigo-500">

      <div className="text-center max-w-xl px-6 animate-fadeIn">

        <img
          src="/src/assets/moodmirror_logo.png"
          alt="MoodMirror logo"
          className="mx-auto h-60 mb-8 drop-shadow-lg"
        />

        <p className="text-white/85 text-lg leading-relaxed">
          Initializing MoodMirror…
        </p>

        <p className="text-white/60 text-sm mt-4">
          Preparing your AI-powered music experience
        </p>
      </div>
    </div>
  );
}