export function DarkModeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-4 right-4 z-50 transition-all duration-300 focus:outline-none group"
      aria-label="Toggle dark mode"
    >
      <div
        className={[
          "relative w-11 h-6 rounded-full transition-all duration-500 ease-in-out",
          "flex items-center",
          isDark
            ? "bg-[#1A237E] shadow-[0_0_12px_rgba(99,102,241,0.5)] border border-indigo-400/30"
            : "bg-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.15)] border border-black/10",
        ].join(" ")}
        style={{ backdropFilter: "blur(12px)" }}
      >
        {/* Thumb */}
        <div
          className={[
            "absolute w-4.5 h-[18px] rounded-full transition-all duration-400 ease-in-out flex items-center justify-center",
            isDark
              ? "translate-x-[22px] bg-indigo-200 shadow-[0_1px_4px_rgba(99,102,241,0.6)]"
              : "translate-x-[3px] bg-amber-400 shadow-[0_1px_4px_rgba(251,191,36,0.6)]",
          ].join(" ")}
          style={{ width: 18, height: 18 }}
        >
          {isDark ? (
            <svg className="w-3 h-3 text-indigo-900" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 3.065a1 1 0 011.415 0l.707.707a1 1 0 11-1.414 1.414l-.708-.707a1 1 0 010-1.414zM17 10a1 1 0 011 1h-1a1 1 0 110-2h1a1 1 0 01-1 1zm-1.85 4.315a1 1 0 010 1.415l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.315-1.85a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0z" />
            </svg>
          ) : (
            <svg className="w-2.5 h-2.5 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}