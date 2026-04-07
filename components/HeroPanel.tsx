import { ChevronBlock } from './ChevronBlock';
import { MonthTheme } from '../types';

// Curated Unsplash images — each month has a distinct seasonal/thematic photo
// Using Unsplash source API with specific photo IDs for consistent, beautiful images
const MONTH_IMAGES = [
  // January — icy mountains, snow
  "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1200&h=480&fit=crop&q=80",
  // February — misty forest, soft light
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=480&fit=crop&q=80",
  // March — cherry blossoms, spring bloom
  "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&h=480&fit=crop&q=80",
  // April — tulip fields, vibrant colours
  "https://images.unsplash.com/photo-1490750967868-88df5691cc73?w=1200&h=480&fit=crop&q=80",
  // May — lush green meadow & wildflowers
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&h=480&fit=crop&q=80",
  // June — beach horizon at golden hour
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=480&fit=crop&q=80",
  // July — tropical ocean, crystal water
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=480&fit=crop&q=80&sat=30",
  // August — sunflower field under blue sky
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&h=480&fit=crop&q=80",
  // September — autumn forest, warm tones
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=480&fit=crop&q=80",
  // October — foggy forest path, fall leaves
  "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=1200&h=480&fit=crop&q=80",
  // November — bare trees, moody sky
  "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1200&h=480&fit=crop&q=80",
  // December — snowy night, festive lights
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=480&fit=crop&q=80",
];

// Fallback picsum IDs in case Unsplash is unavailable (distinct per month)
const PICSUM_FALLBACK = [
  "https://picsum.photos/id/29/1200/480",  // Jan — snowy mountain
  "https://picsum.photos/id/137/1200/480", // Feb — misty forest
  "https://picsum.photos/id/152/1200/480", // Mar — blooming field
  "https://picsum.photos/id/152/1200/480", // Apr — flowers
  "https://picsum.photos/id/142/1200/480", // May — green hills
  "https://picsum.photos/id/14/1200/480",  // Jun — sea
  "https://picsum.photos/id/12/1200/480",  // Jul — beach
  "https://picsum.photos/id/162/1200/480", // Aug — sunlit field
  "https://picsum.photos/id/10/1200/480",  // Sep — deep forest
  "https://picsum.photos/id/165/1200/480", // Oct — autumn
  "https://picsum.photos/id/166/1200/480", // Nov — foggy road
  "https://picsum.photos/id/46/1200/480",  // Dec — mountain range
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Season label per month
const SEASON_META: { icon: string; label: string; hemisphere: string }[] = [
  { icon: '❄️', label: 'Winter', hemisphere: 'Jan' },
  { icon: '❄️', label: 'Winter', hemisphere: 'Feb' },
  { icon: '🌸', label: 'Spring', hemisphere: 'Mar' },
  { icon: '🌸', label: 'Spring', hemisphere: 'Apr' },
  { icon: '🌿', label: 'Spring', hemisphere: 'May' },
  { icon: '☀️', label: 'Summer', hemisphere: 'Jun' },
  { icon: '☀️', label: 'Summer', hemisphere: 'Jul' },
  { icon: '☀️', label: 'Summer', hemisphere: 'Aug' },
  { icon: '🍂', label: 'Autumn', hemisphere: 'Sep' },
  { icon: '🍂', label: 'Autumn', hemisphere: 'Oct' },
  { icon: '🍁', label: 'Autumn', hemisphere: 'Nov' },
  { icon: '❄️', label: 'Winter', hemisphere: 'Dec' },
];

type Props = {
  monthIndex: number;
  year: number;
  theme: MonthTheme;
};

export function HeroPanel({ monthIndex, year, theme }: Props) {
  const idx = monthIndex % 12;
  const season = SEASON_META[idx];

  return (
    <div
      data-hero-panel=""
      className="relative w-full h-[46vw] sm:h-[210px] lg:h-[240px] overflow-hidden"
      style={{ borderRadius: '16px 16px 0 0' }}
    >
      {/* Primary image — Unsplash */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MONTH_IMAGES[idx]}
        alt={MONTH_NAMES[idx]}
        loading="eager"
        className="w-full h-full object-cover"
        style={{ transform: 'scale(1.04)', transition: 'transform 0.6s ease' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = PICSUM_FALLBACK[idx];
        }}
      />

      {/* Bottom gradient for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0) 25%,
            rgba(0,0,0,0.30) 70%,
            rgba(0,0,0,0.58) 100%
          )`,
        }}
      />

      {/* Left depth band */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${theme.chevron}30 0%, transparent 45%)`,
        }}
      />

      {/* Season badge — top left */}
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-white/90 text-[11px] font-semibold backdrop-blur-md"
        style={{
          background: 'rgba(0,0,0,0.28)',
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <span>{season.icon}</span>
        <span>{season.label}</span>
      </div>

      {/* Chevron month/year badge — bottom right */}
      <ChevronBlock theme={theme} year={year} monthName={MONTH_NAMES[idx]} />
    </div>
  );
}