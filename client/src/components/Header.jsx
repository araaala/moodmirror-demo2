import { useNavigate } from "react-router-dom";

export default function Header({ step }) {
  const navigate = useNavigate();

  return (
    <header className="px-6 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-4">
         <img
  src="/moodmirror_logo.png"
  alt="MoodMirror logo"
  className="h-10 w-auto"
/>

          {step && (
            <div className="text-white/70 text-sm uppercase tracking-wider">
              {step}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">

          {/* Mood Detection Button */}
          <button
  onClick={() => navigate("/mood")}
  className="p-3 rounded-full
    border border-white/30 bg-white/10
    hover:bg-white/20 transition
    text-xl"
  aria-label="Mood Detection"
  title="Mood Detection"
>
  🎭
</button>


          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="p-3 rounded-full border border-white/30
              bg-white/10 hover:bg-white/20 transition"
            aria-label="Go home"
          >
            🏠
          </button>

        </div>
      </div>
    </header>
  );
}
