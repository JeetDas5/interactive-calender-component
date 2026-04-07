import { MonthTheme } from '../types';

// 48 unique inspirational quotes — one per month from Jan 2025 → Dec 2028
const MONTHLY_QUOTES: Record<string, { text: string; author: string }> = {
  // 2025
  '2025-1':  { text: "The beginning is always today.", author: "Mary Shelley" },
  '2025-2':  { text: "Love is the only force capable of transforming an enemy into a friend.", author: "M. L. King Jr." },
  '2025-3':  { text: "No winter lasts forever; no spring skips its turn.", author: "Hal Borland" },
  '2025-4':  { text: "April hath put a spirit of youth in everything.", author: "Shakespeare" },
  '2025-5':  { text: "The earth laughs in flowers.", author: "R. W. Emerson" },
  '2025-6':  { text: "Deep summer is when laziness finds respectability.", author: "Sam Keen" },
  '2025-7':  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  '2025-8':  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  '2025-9':  { text: "If you fall behind, run faster. Never give up.", author: "Jesse Jackson" },
  '2025-10': { text: "Autumn is a second spring where every leaf is a flower.", author: "Albert Camus" },
  '2025-11': { text: "We must be willing to let go of the life we planned.", author: "Joseph Campbell" },
  '2025-12': { text: "As you end this year, know that the best is yet to come.", author: "Unknown" },

  // 2026
  '2026-1':  { text: "Your new life is going to cost you your old one. It's worth it.", author: "Brianna Wiest" },
  '2026-2':  { text: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt" },
  '2026-3':  { text: "It's the life in your years that count.", author: "Abraham Lincoln" },
  '2026-4':  { text: "The sun gathers strength and courage as the day gets on.", author: "Charles Dickens" },
  '2026-5':  { text: "One small positive thought can change your whole day.", author: "Dalai Lama" },
  '2026-6':  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  '2026-7':  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  '2026-8':  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  '2026-9':  { text: "You can't go back, but you can start where you are and change the ending.", author: "C.S. Lewis" },
  '2026-10': { text: "Be so good they can't ignore you.", author: "Steve Martin" },
  '2026-11': { text: "Tomorrow is always fresh, with no mistakes in it yet.", author: "L.M. Montgomery" },
  '2026-12': { text: "Cheers to a new year and another chance for us to get it right.", author: "Oprah Winfrey" },

  // 2027
  '2027-1':  { text: "Believe in the beauty of your dreams.", author: "Harriet Tubman" },
  '2027-2':  { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  '2027-3':  { text: "Good thoughts shine out of your face like sunbeams.", author: "Roald Dahl" },
  '2027-4':  { text: "Everything is possible to him who wills.", author: "Alexandre Dumas" },
  '2027-5':  { text: "Go confidently in the direction of your dreams.", author: "Henry David Thoreau" },
  '2027-6':  { text: "Nothing is impossible — the word itself says 'I'm possible!'", author: "Audrey Hepburn" },
  '2027-7':  { text: "Life is short and the world is wide.", author: "Simon Raven" },
  '2027-8':  { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
  '2027-9':  { text: "We cannot direct the wind, but we can adjust the sails.", author: "Dolly Parton" },
  '2027-10': { text: "You are never too old to dream a new dream.", author: "Leslie Brown" },
  '2027-11': { text: "Go where there is no path and leave a trail.", author: "Emerson" },
  '2027-12': { text: "It's never too late to become who you might have been.", author: "George Eliot" },

  // 2028
  '2028-1':  { text: "Ultimately we write our own story.", author: "Alex Morritt" },
  '2028-2':  { text: "A small act of kindness today shapes a greater world tomorrow.", author: "Unknown" },
  '2028-3':  { text: "Take the moment and make it perfect.", author: "Zoey Sayward" },
  '2028-4':  { text: "Spring shows what can be done with a drab world.", author: "Virgil A. Kraft" },
  '2028-5':  { text: "Your only limit is your mind.", author: "Unknown" },
  '2028-6':  { text: "The harder you work, the greater you'll feel when you achieve it.", author: "Unknown" },
  '2028-7':  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  '2028-8':  { text: "Great things never come from comfort zones.", author: "Unknown" },
  '2028-9':  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  '2028-10': { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
  '2028-11': { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  '2028-12': { text: "End each year with gratitude and begin the next one with hope.", author: "Unknown" },
};

type Props = {
  theme: MonthTheme;
  isDark: boolean;
  currentYear: number;
  currentMonth: number;
};

export function DailyQuote({ theme, isDark, currentYear, currentMonth }: Props) {
  const key = `${currentYear}-${currentMonth + 1}`;
  const quote = MONTHLY_QUOTES[key] ?? { text: "Every month is a new beginning.", author: "Unknown" };

  return (
    <div
      className="relative mx-0 mt-0 mb-3 px-4 py-3.5 rounded-xl overflow-hidden"
      style={{
        background: isDark
          ? `linear-gradient(135deg, ${theme.accent}18 0%, ${theme.accent}08 100%)`
          : `linear-gradient(135deg, ${theme.accent}12 0%, ${theme.accent}05 100%)`,
        border: `1px solid ${theme.accent}28`,
      }}
    >
      {/* Large decorative quote mark */}
      <div
        className="absolute -top-1 -left-0.5 text-[52px] leading-none font-serif pointer-events-none select-none"
        style={{ color: `${theme.accent}22`, fontFamily: 'Georgia, serif' }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Accent label */}
      <div
        className="text-[8px] uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-1.5"
        style={{ color: theme.accent }}
      >
        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Monthly Inspiration
      </div>

      {/* Quote text */}
      <p
        className="text-[12px] leading-[18px] italic relative z-10 pr-1"
        style={{ color: isDark ? '#D0D0E0' : '#3a3a4a' }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>

      {/* Author */}
      <p
        className="text-[10px] mt-2 text-right font-semibold tracking-wide"
        style={{ color: theme.accent }}
      >
        — {quote.author}
      </p>
    </div>
  );
}