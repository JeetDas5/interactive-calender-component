import { DateCell } from './DateCell';
import { MonthTheme } from '../types';

const FIXED_HOLIDAYS: Record<string, string> = {
  '01-01': "New Year's Day",
  '01-14': 'Makar Sankranti',
  '01-26': 'Republic Day',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanti',
  '12-25': 'Christmas',
};

const LUNAR_HOLIDAYS: Record<string, string> = {
  // 2026
  '2026-01-23': 'Vasant Panchami',
  '2026-02-15': 'Maha Shivratri',
  '2026-03-03': 'Holika Dahan',
  '2026-03-04': 'Holi',
  '2026-03-19': 'Ugadi',
  '2026-03-21': 'Eid-ul-Fitr',
  '2026-03-27': 'Ram Navami',
  '2026-03-31': 'Mahavir Jayanti',
  '2026-04-02': 'Hanuman Jayanti',
  '2026-04-03': 'Good Friday',
  '2026-04-14': 'Dr. Ambedkar Jayanti / Baisakhi',
  '2026-05-01': 'Buddha Purnima',
  '2026-05-27': 'Eid-ul-Zuha (Bakrid)',
  '2026-06-26': 'Muharram',
  '2026-08-28': 'Raksha Bandhan',
  '2026-09-04': 'Janmashtami',
  '2026-09-14': 'Ganesh Chaturthi',
  '2026-10-20': 'Dussehra',
  '2026-11-08': 'Diwali',
  '2026-11-24': 'Guru Nanak Jayanti',
  // 2027
  '2027-02-10': 'Vasant Panchami',
  '2027-03-06': 'Maha Shivratri',
  '2027-03-10': 'Eid-ul-Fitr',
  '2027-03-22': 'Holika Dahan',
  '2027-03-23': 'Holi',
  '2027-03-26': 'Good Friday',
  '2027-04-07': 'Ugadi',
  '2027-04-14': 'Dr. Ambedkar Jayanti / Baisakhi',
  '2027-04-15': 'Ram Navami',
  '2027-04-20': 'Mahavir Jayanti',
  '2027-05-16': 'Eid-ul-Zuha (Bakrid)',
  '2027-05-20': 'Buddha Purnima',
  '2027-06-15': 'Muharram',
  '2027-08-17': 'Raksha Bandhan',
  '2027-08-25': 'Janmashtami',
  '2027-09-04': 'Ganesh Chaturthi',
  '2027-10-09': 'Dussehra',
  '2027-10-29': 'Diwali',
  '2027-11-13': 'Guru Nanak Jayanti',
};

function getHoliday(dateStr: string): string | undefined {
  const monthDay = dateStr.slice(5);
  return FIXED_HOLIDAYS[monthDay] || LUNAR_HOLIDAYS[dateStr];
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

type Props = {
  currentYear: number;
  currentMonth: number;
  weekStartsOn: 'sun' | 'mon';
  selectedRange: { start: string; end: string } | null;
  hoveredDate: string | null;
  theme: MonthTheme;
  onClickDate: (iso: string) => void;
  onHoverDate: (iso: string) => void;
  onToggleWeekStart: () => void;
};

export function CalendarGrid({
  currentYear, currentMonth, weekStartsOn, selectedRange, hoveredDate,
  theme, onClickDate, onHoverDate, onToggleWeekStart
}: Props) {
  const todayISO = toISO(new Date());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  let startOffset = firstDay;
  if (weekStartsOn === 'mon') {
    startOffset = firstDay === 0 ? 6 : firstDay - 1;
  }

  const gridStart = new Date(currentYear, currentMonth, 1);
  gridStart.setDate(1 - startOffset);

  const dates: { date: Date; iso: string }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    dates.push({ date: d, iso: toISO(d) });
  }

  const dayNamesMon = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dayNamesSun = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayNames = weekStartsOn === 'mon' ? dayNamesMon : dayNamesSun;

  void daysInMonth; // suppress unused warning

  return (
    <div className="w-full flex-grow flex flex-col">
      {/* Week start toggle */}
      <div className="flex justify-end items-center px-4 sm:px-5 mb-1 mt-1">
        <button
          onClick={onToggleWeekStart}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider font-semibold transition-all duration-200 hover:opacity-80 focus:outline-none"
          style={{
            color: theme.accent,
            background: `${theme.accent}12`,
            border: `1px solid ${theme.accent}25`,
          }}
        >
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {weekStartsOn === 'mon' ? 'Mon' : 'Sun'} first
        </button>
      </div>

      <div className="px-3 sm:px-5 w-full pb-2">
        {/* Day name headers */}
        <div className="grid grid-cols-7 gap-y-1 mb-1" role="row">
          {dayNames.map((day) => {
            const isWeekend = day === 'SAT' || day === 'SUN';
            return (
              <div
                key={day}
                className="text-[9px] sm:text-[10px] font-bold tracking-[0.1em] text-center py-1"
                style={{
                  color: isWeekend ? theme.accent : undefined,
                }}
              >
                <span className={!isWeekend ? 'text-[#AAAAAA] dark:text-[#555577]' : ''}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Date grid */}
        <div
          className="grid grid-cols-7 gap-y-0.5"
          role="grid"
          aria-label={`Calendar ${currentYear}-${currentMonth + 1}`}
        >
          {dates.map(({ date, iso }, index) => {
            const isCurrentMonth = date.getMonth() === currentMonth;
            const isToday = iso === todayISO;
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isRowStart = index % 7 === 0;
            const isRowEnd = index % 7 === 6;

            let state: 'none' | 'start' | 'end' | 'single' | 'in-range' | 'hover-range' = 'none';
            if (selectedRange) {
              const { start, end } = selectedRange;
              if (start === end) {
                if (iso === start) state = 'single';
                else if (iso > start && hoveredDate && iso <= hoveredDate) state = 'hover-range';
              } else {
                if (iso === start) state = 'start';
                else if (iso === end) state = 'end';
                else if (iso > start && iso < end) state = 'in-range';
              }
            }

            return (
              <DateCell
                key={iso}
                dateObj={date}
                isoString={iso}
                isCurrentMonth={isCurrentMonth}
                isToday={isToday}
                isWeekend={isWeekend}
                selectionState={state}
                isRowStart={isRowStart}
                isRowEnd={isRowEnd}
                holidayName={getHoliday(iso)}
                theme={theme}
                onClick={onClickDate}
                onHover={onHoverDate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}