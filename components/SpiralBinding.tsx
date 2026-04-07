import { MonthTheme } from '../types';

type Props = {
  monthIndex?: number;
  theme?: MonthTheme;
};

function CoilRing({ filled, accent }: { filled: boolean; accent: string }) {
  const color = filled ? accent : 'rgba(160,160,180,0.4)';
  const innerColor = filled ? `${accent}28` : 'rgba(80,80,100,0.08)';
  const glowFilter = filled ? `drop-shadow(0 2px 6px ${accent}66)` : undefined;

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, filter: glowFilter, transition: 'filter 0.4s ease' }}
    >
      {/* Outer ring */}
      <circle cx="15" cy="15" r="11.5" stroke={color} strokeWidth="3.5" fill={innerColor} />
      {/* Inner rim highlight */}
      <circle cx="15" cy="15" r="7.5" stroke={filled ? `${accent}40` : 'transparent'} strokeWidth="1" fill="none" />
      {/* 3-D shine */}
      <ellipse cx="11" cy="10" rx="3" ry="2" fill="rgba(255,255,255,0.3)" />
      {/* Bottom gap (wire through paper) */}
      <line x1="10" y1="26" x2="20" y2="26" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
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
      {rings.map((_, i) => (
        <CoilRing key={i} filled={i <= (monthIndex % 12)} accent={accent} />
      ))}
    </div>
  );
}