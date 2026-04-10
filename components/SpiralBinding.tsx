import { MonthTheme } from '../types';

type Props = {
  monthIndex?: number;
  theme?: MonthTheme;
};

function HangerHook() {
  return (
    <div 
      className="absolute top-[-38px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <svg
        width="80"
        height="50"
        viewBox="0 0 80 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 6px 4px rgba(0,0,0,0.3))' }}
      >
        {/* Main hanger wire */}
        <path
          d="M 26 50 L 26 25 Q 26 5 40 5 Q 54 5 54 25 L 54 50"
          fill="none"
          stroke="url(#wire-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Highlight for wire cylindrical 3D look */}
        <path
          d="M 26.5 50 L 26.5 25 Q 26.5 6 40 6 Q 53.5 6 53.5 25 L 53.5 50"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="wire-gradient" x1="26" y1="5" x2="54" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="30%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#4b5563" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* The Nail */}
      <div 
        className="absolute top-[8px] rounded-full"
        style={{
          width: '8px',
          height: '8px',
          background: 'radial-gradient(circle at 30% 30%, #9ca3af, #374151 70%)',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.4)',
          border: '0.5px solid #1f2937'
        }}
      />
    </div>
  );
}

function CoilRing({ filled, accent }: { filled: boolean; accent: string }) {
  const color = filled ? accent : '#d1d5db';
  const glowFilter = filled ? `drop-shadow(0 2px 6px ${accent})` : 'drop-shadow(0 4px 4px rgba(0,0,0,0.3))';

  return (
    <svg
      width="24"
      height="45"
      viewBox="0 0 24 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, filter: glowFilter, transition: 'filter 0.4s ease' }}
    >
      {/* Punched hole */}
      <ellipse cx="10" cy="38" rx="6" ry="3.5" fill="#020617" />
      <ellipse cx="10" cy="39" rx="6" ry="3.5" fill="rgba(255,255,255,0.2)" />

      {/* Ring loop */}
      <path
        d="M 10 38 L 10 14 C 10 0 20 0 20 14"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Highlight */}
      <path
        d="M 10 38 L 10 14 C 10 1 19 1 19 14"
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function SpiralBinding({ monthIndex = 0, theme }: Props) {
  const rings = Array.from({ length: 12 });
  const accent = theme?.accent ?? '#E07060';

  return (
    <div
      className="w-full flex justify-around pointer-events-none"
      style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        position: 'relative',
        zIndex: 30,
        marginBottom: '-13px',
        transition: 'all 0.4s ease',
      }}
    >
      <HangerHook />
      {rings.map((_, i) => (
        <CoilRing key={i} filled={i <= (monthIndex % 12)} accent={accent} />
      ))}
    </div>
  );
}