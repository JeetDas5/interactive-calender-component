import { MonthTheme } from '../types';

type Props = {
  theme: MonthTheme;
  selectedRange: { start: string; end: string } | null;
  onClear: () => void;
};

export function RangeSummaryBar({ theme, selectedRange, onClear }: Props) {
  if (!selectedRange || selectedRange.start === selectedRange.end) return null;

  const start = new Date(selectedRange.start);
  const end = new Date(selectedRange.end);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const startStr = start.toLocaleDateString('en-US', formatOptions);
  const endStr = end.toLocaleDateString('en-US', formatOptions);

  return (
    <div className="flex items-center px-4 sm:px-5 mb-3 animate-fade-up">
      <div
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-semibold tracking-wide border transition-all"
        style={{
          backgroundColor: `${theme.accent}14`,
          color: theme.accent,
          borderColor: `${theme.accent}30`,
          boxShadow: `0 2px 12px ${theme.accent}20`,
        }}
      >
        {/* Calendar icon */}
        <svg className="w-3.5 h-3.5 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{startStr} → {endStr}</span>
        <span
          className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
          style={{ backgroundColor: `${theme.accent}25` }}
        >
          {diffDays}d
        </span>
        <button
          onClick={onClear}
          className="ml-1 w-4 h-4 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
          aria-label="Clear selection"
          style={{ backgroundColor: `${theme.accent}30` }}
        >
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}