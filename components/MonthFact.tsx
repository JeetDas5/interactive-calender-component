import { MonthTheme } from '../types';

// One curated historical fact / notable event per calendar month (0-indexed)
const MONTH_FACTS: { year: string; fact: string; category: string; emoji: string }[] = [
  // January (0)
  {
    year: '1969',
    fact: 'Neil Armstrong & Buzz Aldrin completed the first Moon-walk during the Apollo 11 mission, which launched on July 16 and returned in late July — but the crew were in January isolation.',
    category: 'Space',
    emoji: '🚀',
  },
  // February (1)
  {
    year: '1962',
    fact: 'John Glenn became the first American to orbit Earth on February 20, completing three orbits in Friendship 7 in just under five hours.',
    category: 'Space',
    emoji: '🌍',
  },
  // March (2)
  {
    year: '1876',
    fact: 'Alexander Graham Bell made the first successful telephone call on March 10, uttering the famous words: "Mr. Watson — come here — I want to see you."',
    category: 'Innovation',
    emoji: '📞',
  },
  // April (3)
  {
    year: '1912',
    fact: 'The RMS Titanic sank on April 15 after colliding with an iceberg, claiming over 1,500 lives and changing maritime safety laws forever.',
    category: 'History',
    emoji: '🚢',
  },
  // May (4)
  {
    year: '1954',
    fact: 'Roger Bannister broke the four-minute mile on May 6, running 3:59.4 at Oxford — a feat once considered physiologically impossible.',
    category: 'Sports',
    emoji: '🏃',
  },
  // June (5)
  {
    year: '1944',
    fact: "D-Day — June 6 — saw the largest seaborne invasion in history as over 156,000 Allied troops landed on Normandy's beaches, turning the tide of World War II.",
    category: 'History',
    emoji: '⚓',
  },
  // July (6)
  {
    year: '1969',
    fact: 'On July 20, Apollo 11 astronaut Neil Armstrong stepped onto the Moon, making humanity\'s first lunar landing with the words "That\'s one small step for man."',
    category: 'Space',
    emoji: '🌕',
  },
  // August (7)
  {
    year: '1945',
    fact: 'The first atomic bomb, "Little Boy," was dropped on Hiroshima on August 6 — a moment that ended World War II and reshaped geopolitics forever.',
    category: 'History',
    emoji: '☮️',
  },
  // September (8)
  {
    year: '1869',
    fact: 'The Suez Canal opened on November 17, but was completed in September 1869, cutting the sea route from Europe to Asia by ~7,000 km.',
    category: 'Engineering',
    emoji: '⚙️',
  },
  // October (9)
  {
    year: '1957',
    fact: 'The USSR launched Sputnik 1 on October 4 — the world\'s first artificial satellite — triggering the Space Race and transforming science forever.',
    category: 'Space',
    emoji: '🛰️',
  },
  // November (10)
  {
    year: '1989',
    fact: 'The Berlin Wall fell on November 9, reuniting East and West Germany after 28 years and symbolising the end of the Cold War.',
    category: 'History',
    emoji: '🧱',
  },
  // December (11)
  {
    year: '1903',
    fact: 'The Wright Brothers made the first powered airplane flight on December 17 at Kitty Hawk, lasting just 12 seconds — and changing travel forever.',
    category: 'Aviation',
    emoji: '✈️',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Space:       '#6366F1',
  Innovation:  '#8B5CF6',
  History:     '#D97706',
  Sports:      '#10B981',
  Engineering: '#0EA5E9',
  Aviation:    '#3B82F6',
};

type Props = {
  theme: MonthTheme;
  isDark: boolean;
  currentMonth: number; // 0-indexed
};

export function MonthFact({ theme, isDark, currentMonth }: Props) {
  const fact = MONTH_FACTS[currentMonth % 12];
  const catColor = CATEGORY_COLORS[fact.category] ?? theme.accent;

  return (
    <div
      className="relative overflow-hidden rounded-xl border mb-3"
      style={{
        borderColor: isDark ? `${catColor}30` : `${catColor}25`,
        background: isDark
          ? `linear-gradient(135deg, ${catColor}14 0%, ${catColor}06 100%)`
          : `linear-gradient(135deg, ${catColor}10 0%, ${catColor}04 100%)`,
      }}
    >
      {/* Big decorative emoji background */}
      <div
        className="absolute -right-2 -top-2 text-[56px] pointer-events-none select-none"
        style={{ opacity: 0.12 }}
        aria-hidden="true"
      >
        {fact.emoji}
      </div>

      <div className="relative p-3.5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px]">{fact.emoji}</span>
            <span
              className="text-[8px] uppercase tracking-[0.18em] font-bold px-1.5 py-0.5 rounded-full"
              style={{
                color: catColor,
                background: `${catColor}20`,
              }}
            >
              {fact.category}
            </span>
          </div>
          <span
            className="text-[10px] font-bold tracking-wider font-mono"
            style={{ color: isDark ? `${catColor}CC` : `${catColor}BB` }}
          >
            {fact.year}
          </span>
        </div>

        {/* Fact text */}
        <p
          className="text-[11.5px] leading-[17px]"
          style={{ color: isDark ? '#C8C8D8' : '#3a3a4a' }}
        >
          {fact.fact}
        </p>

        {/* Label */}
        <p
          className="text-[8.5px] uppercase tracking-[0.15em] mt-2 font-semibold"
          style={{ color: isDark ? '#555577' : '#BBBBCC' }}
        >
          ✦ This month in history
        </p>
      </div>
    </div>
  );
}
