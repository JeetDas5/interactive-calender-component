import { MonthTheme } from '../types';

type Props = {
  theme: MonthTheme;
  year: number;
  monthName: string;
};

export function ChevronBlock({ theme, year, monthName }: Props) {
  return (
    <div
      className="absolute bottom-0 right-0 w-auto min-w-[32%] sm:min-w-[36%] flex flex-col items-end justify-end overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.chevron}CC 0%, ${theme.chevron} 100%)`,
        clipPath: 'polygon(36px 0, 100% 0, 100% 100%, 0 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Subtle inner shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)',
        }}
      />
      <div className="relative px-4 sm:px-5 pb-3 sm:pb-4 pt-3 sm:pt-4 flex flex-col items-end">
        <div className="text-white/75 text-[10px] sm:text-[12px] font-medium tracking-[0.18em] uppercase mb-0.5">
          {year}
        </div>
        <div className="text-white text-[20px] sm:text-[28px] font-serif font-bold tracking-wide leading-none drop-shadow-sm">
          {monthName}
        </div>
      </div>
    </div>
  );
}