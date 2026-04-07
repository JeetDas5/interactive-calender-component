import { useCalendarNotes } from '../hooks/useCalendarNotes';
import { MonthTheme, CalendarState } from '../types';
import { DailyQuote } from './DailyQuote';
import { MonthFact } from './MonthFact';
import { HolidayStrip } from './HolidayStrip';

type Props = {
  state: CalendarState;
  theme: MonthTheme;
  setActiveTab: (tab: 'month' | 'range') => void;
};

export function NotesPanel({ state, theme, setActiveTab }: Props) {
  const { currentYear, currentMonth, selectedRange, activeNoteTab, isDark } = state;

  const monthKey = `cal_note_month_${currentYear}_${currentMonth + 1}`;
  const rangeKey =
    selectedRange && selectedRange.start !== selectedRange.end
      ? `cal_note_range_${selectedRange.start}_${selectedRange.end}`
      : null;

  const activeKey = activeNoteTab === 'month' ? monthKey : rangeKey;
  const { note, setNote, showSaved } = useCalendarNotes(activeKey);

  const isRangeModeActive = activeNoteTab === 'range';
  const textColor = isDark ? '#D8D8E8' : '#2C2C2C';

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">

      {/* ── Panel header ── */}
      <div
        className="px-4 pt-5 pb-3 border-b"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }}
      >
        {/* Title */}
        <div
          className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-1.5"
          style={{ color: theme.accent }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Notes
        </div>

        {/* Tab switcher — pill style */}
        <div
          className="flex rounded-lg p-0.5"
          style={{
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
          }}
        >
          {(['month', 'range'] as const).map((tab) => {
            const isActive = (tab === 'range') === isRangeModeActive;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-all duration-200 focus:outline-none"
                style={{
                  background: isActive
                    ? isDark ? `${theme.accent}30` : `${theme.accent}18`
                    : 'transparent',
                  color: isActive ? theme.accent : isDark ? '#666688' : '#AAAAAA',
                  boxShadow: isActive ? `0 1px 4px ${theme.accent}25` : 'none',
                }}
              >
                {tab === 'month' ? '📅 Month' : '📆 Range'}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Info card area ── */}
      <div className="px-4 pt-4">
        {isRangeModeActive ? (
          /* Range tab → Historical fact */
          <MonthFact theme={theme} isDark={isDark} currentMonth={currentMonth} />
        ) : (
          /* Month tab → Inspirational quote */
          <DailyQuote
            theme={theme}
            isDark={isDark}
            currentYear={currentYear}
            currentMonth={currentMonth}
          />
        )}
      </div>

      {/* ── Holiday strip — always visible ── */}
      <HolidayStrip
        theme={theme}
        isDark={isDark}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />

      {/* ── Textarea / note area ── */}
      <div className="grow flex flex-col px-4 pb-5 min-h-0">
        {/* Label row */}
        <div className="text-[9px] uppercase tracking-[0.15em] font-bold mb-2 flex items-center justify-between">
          <span style={{ color: isDark ? '#666688' : '#BBBBBB' }}>
            {isRangeModeActive ? 'Range note' : 'Month note'}
          </span>
          {/* Animated saved indicator */}
          <span
            className={`transition-all duration-300 text-[9px] font-semibold flex items-center gap-1 ${
              showSaved ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
            style={{ color: theme.accent }}
          >
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Saved
          </span>
        </div>

        {isRangeModeActive && !rangeKey ? (
          /* No range selected placeholder */
          <div
            className="grow flex flex-col items-center justify-center text-center gap-2 rounded-xl border border-dashed py-6"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              color: isDark ? '#666688' : '#BBBBBB',
            }}
          >
            <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-[11px] italic leading-tight">
              Select a date range<br />to add a note
            </p>
          </div>
        ) : (
          <div className="relative grow flex flex-col">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={300}
              placeholder={
                isRangeModeActive
                  ? 'Notes for this date range...'
                  : 'Your thoughts for this month...'
              }
              className="w-full grow min-h-[90px] text-[12.5px] font-sans resize-none focus:outline-none bg-transparent transition-colors"
              style={{
                lineHeight: '22px',
                color: textColor,
                caretColor: theme.accent,
              }}
            />
            {/* Ruled lines overlay */}
            <div
              className="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  transparent,
                  transparent 21px,
                  ${isDark ? 'rgba(255,255,255,0.045)' : 'rgba(0,0,0,0.05)'} 21px,
                  ${isDark ? 'rgba(255,255,255,0.045)' : 'rgba(0,0,0,0.05)'} 22px
                )`,
              }}
            />
          </div>
        )}

        {/* Char count */}
        <div
          className="flex justify-end mt-1.5 text-[9px]"
          style={{ color: isDark ? '#444466' : '#CCCCCC' }}
        >
          {isRangeModeActive && !rangeKey
            ? '0 / 300'
            : `${Math.min(note.length, 300)} / 300`}
        </div>
      </div>
    </div>
  );
}