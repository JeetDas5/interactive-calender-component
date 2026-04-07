"use client";

import { MonthTheme } from '../types';

// Same holiday map as CalendarGrid (kept in sync)
const FIXED_HOLIDAYS: Record<string, string> = {
  '01-01': "New Year's Day",
  '01-14': 'Makar Sankranti',
  '01-26': 'Republic Day',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanti',
  '12-25': 'Christmas',
};

const LUNAR_HOLIDAYS: Record<string, string> = {
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
  '2026-05-27': 'Eid-ul-Zuha',
  '2026-06-26': 'Muharram',
  '2026-08-28': 'Raksha Bandhan',
  '2026-09-04': 'Janmashtami',
  '2026-09-14': 'Ganesh Chaturthi',
  '2026-10-20': 'Dussehra',
  '2026-11-08': 'Diwali',
  '2026-11-24': 'Guru Nanak Jayanti',
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
  '2027-05-16': 'Eid-ul-Zuha',
  '2027-05-20': 'Buddha Purnima',
  '2027-06-15': 'Muharram',
  '2027-08-17': 'Raksha Bandhan',
  '2027-08-25': 'Janmashtami',
  '2027-09-04': 'Ganesh Chaturthi',
  '2027-10-09': 'Dussehra',
  '2027-10-29': 'Diwali',
  '2027-11-13': 'Guru Nanak Jayanti',
};

function getHolidaysInMonth(year: number, month: number): { day: number; name: string }[] {
  const results: { day: number; name: string }[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const m = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    const iso = `${year}-${m}-${dd}`;
    const monthDay = `${m}-${dd}`;

    const name = FIXED_HOLIDAYS[monthDay] || LUNAR_HOLIDAYS[iso];
    if (name) results.push({ day: d, name });
  }
  return results;
}

type Props = {
  theme: MonthTheme;
  isDark: boolean;
  currentYear: number;
  currentMonth: number;
};

export function HolidayStrip({ theme, isDark, currentYear, currentMonth }: Props) {
  const holidays = getHolidaysInMonth(currentYear, currentMonth);

  if (holidays.length === 0) return null;

  const today = new Date();
  const todayDay = today.getMonth() === currentMonth && today.getFullYear() === currentYear
    ? today.getDate()
    : null;

  return (
    <div className="px-4 pb-4">
      {/* Header */}
      <div
        className="text-[9px] uppercase tracking-[0.18em] font-bold mb-2 flex items-center gap-1.5"
        style={{ color: isDark ? '#555577' : '#BBBBBB' }}
      >
        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        Holidays this month
        <span
          className="ml-auto px-1.5 py-0.5 rounded-full text-[8px] font-bold"
          style={{ background: `${theme.accent}20`, color: theme.accent }}
        >
          {holidays.length}
        </span>
      </div>

      {/* Holiday list */}
      <div className="flex flex-col gap-1">
        {holidays.map(({ day, name }) => {
          const isPast = todayDay !== null && day < todayDay;
          const isToday = todayDay !== null && day === todayDay;

          return (
            <div
              key={`${day}-${name}`}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-all"
              style={{
                background: isToday
                  ? `${theme.accent}1A`
                  : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
                border: isToday ? `1px solid ${theme.accent}30` : '1px solid transparent',
                opacity: isPast ? 0.45 : 1,
              }}
            >
              {/* Day pill */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                style={{
                  background: isToday ? theme.accent : `${theme.accent}18`,
                  color: isToday ? '#fff' : theme.accent,
                }}
              >
                {day}
              </div>

              {/* Holiday name */}
              <span
                className="text-[11px] leading-tight font-medium flex-1 min-w-0 truncate"
                style={{ color: isDark ? '#C8C8D8' : '#3a3a4a' }}
                title={name}
              >
                {name}
              </span>

              {/* Red dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
