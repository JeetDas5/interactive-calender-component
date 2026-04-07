type Props = {
  children: React.ReactNode;
};

export function CalendarCard({ children }: Props) {
  return (
    <div
      id="calendar-card"
      className={[
        "relative w-full max-w-full md:max-w-[720px] lg:max-w-[860px] xl:max-w-[920px] mx-auto",
        "bg-white/80 dark:bg-[#13192d]/90",
        "rounded-2xl",
        "shadow-[0_32px_80px_-8px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.6)]",
        "dark:shadow-[0_32px_80px_-8px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]",
        "backdrop-blur-xl",
        "overflow-hidden",
      ].join(" ")}
    >
      {children}
    </div>
  );
}