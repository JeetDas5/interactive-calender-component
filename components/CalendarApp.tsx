"use client";

import { useState, useEffect } from "react";
import { CalendarCard } from "./CalendarCard";
import { SpiralBinding } from "./SpiralBinding";
import { CalendarGrid } from "./CalendarGrid";
import { RangeSummaryBar } from "./RangeSummaryBar";
import { NotesPanel } from "./NotesPanel";
import { DarkModeToggle } from "./DarkModeToggle";
import styles from "../styles/flip.module.css";
import { useCalendarReducer } from "@/hooks/useCalendarReducer";
import { useMonthTheme } from "@/hooks/useMonthTheme";
import { HeroPanel } from "./HeroPanel";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CalendarApp() {
  const { state, dispatch } = useCalendarReducer();
  const theme = useMonthTheme(state.currentMonth, state.isDark);
  const [mounted, setMounted] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Hydration guard to avoid mismatch between server/client HTML
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const triggerFlip = (action: "NEXT_MONTH" | "PREV_MONTH") => {
    if (isFlipping) return;
    setIsFlipping(true);
    dispatch({ type: "SET_FLIP_STATE", payload: "flipping-out" });
    setTimeout(() => {
      dispatch({ type: action });
      dispatch({ type: "SET_FLIP_STATE", payload: "flipping-in" });
      setTimeout(() => {
        dispatch({ type: "SET_FLIP_STATE", payload: "idle" });
        setIsFlipping(false);
      }, 480);
    }, 580);
  };

  if (!mounted) return <div className="min-h-screen" />;

  let animateClass = "";
  if (state.flipState === "flipping-out")
    animateClass = `${styles.flipOut} ${styles.creaseOverlay}`;
  if (state.flipState === "flipping-in") animateClass = styles.flipIn;

  const today = new Date();
  const isCurrentMonth =
    state.currentMonth === today.getMonth() &&
    state.currentYear === today.getFullYear();

  const dividerColor = state.isDark
    ? "rgba(255,255,255,0.07)"
    : "rgba(0,0,0,0.07)";

  const bodyBg = state.isDark
    ? "linear-gradient(180deg, #13192d 0%, #0f1520 100%)"
    : "linear-gradient(180deg, #fefefe 0%, #fafaf7 100%)";

  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 flex items-center justify-center font-sans">
      <div className="relative w-full max-w-full md:max-w-[720px] lg:max-w-[860px] xl:max-w-[920px] mx-auto pt-7">
        {/* Spiral binding */}
        <SpiralBinding monthIndex={state.currentMonth} theme={theme} />

        <CalendarCard>
          {/* Dark mode toggle */}
          <DarkModeToggle
            isDark={state.isDark}
            onToggle={() =>
              dispatch({ type: "SET_DARK_MODE", payload: !state.isDark })
            }
          />

          {/* Flip animation wrapper */}
          <div
            className={`w-full flex flex-col items-center relative ${animateClass}`}
          >
            {/* ── Hero image ── */}
            <div className="w-full">
              <HeroPanel
                monthIndex={state.currentMonth}
                year={state.currentYear}
                theme={theme}
              />
            </div>

            {/* ── Bottom section ── */}
            <div
              className="w-full flex flex-col md:flex-row relative"
              style={{ background: bodyBg }}
            >
              {/* LEFT COLUMN — Notes panel (desktop only) */}
              <div
                className="hidden md:flex w-full md:w-[30%] shrink-0 flex-col border-r"
                style={{ borderColor: dividerColor, minHeight: 360 }}
              >
                <NotesPanel
                  state={state}
                  theme={theme}
                  setActiveTab={(tab) =>
                    dispatch({ type: "SET_ACTIVE_NOTE_TAB", payload: tab })
                  }
                />
              </div>

              {/* RIGHT COLUMN — Nav + Grid */}
              <div className="w-full md:w-[70%] flex flex-col pt-3 pb-3">
                {/* Month navigation header */}
                <div className="flex justify-between items-center px-4 sm:px-5 mt-1 mb-1">
                  {/* Prev button */}
                  <button
                    onClick={() => triggerFlip("PREV_MONTH")}
                    disabled={isFlipping}
                    className={[
                      "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none",
                      isFlipping
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:scale-110 active:scale-95",
                    ].join(" ")}
                    style={{
                      color: theme.accent,
                      background: `${theme.accent}14`,
                      boxShadow: `0 2px 8px ${theme.accent}20`,
                    }}
                    aria-label="Previous month"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* Month + Year display */}
                  <div className="flex flex-col items-center gap-0.5">
                    <div
                      className="text-[18px] sm:text-[20px] font-serif font-bold leading-tight"
                      style={{ color: state.isDark ? "#E8E8F0" : "#1a1a2e" }}
                    >
                      {MONTH_NAMES[state.currentMonth]}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] font-medium tracking-[0.15em] uppercase"
                        style={{ color: state.isDark ? "#666688" : "#AAAAAA" }}
                      >
                        {state.currentYear}
                      </span>
                      {/* "Today" jump — only visible when NOT on current month */}
                      {!isCurrentMonth && (
                        <button
                          onClick={() => dispatch({ type: "GO_TO_TODAY" })}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80 active:scale-95"
                          style={{
                            background: `${theme.accent}18`,
                            color: theme.accent,
                            border: `1px solid ${theme.accent}30`,
                          }}
                          title="Jump to today"
                        >
                          <svg
                            className="w-2.5 h-2.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Today
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => triggerFlip("NEXT_MONTH")}
                    disabled={isFlipping}
                    className={[
                      "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none",
                      isFlipping
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:scale-110 active:scale-95",
                    ].join(" ")}
                    style={{
                      color: theme.accent,
                      background: `${theme.accent}14`,
                      boxShadow: `0 2px 8px ${theme.accent}20`,
                    }}
                    aria-label="Next month"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Calendar grid */}
                <CalendarGrid
                  currentYear={state.currentYear}
                  currentMonth={state.currentMonth}
                  weekStartsOn={state.weekStartsOn}
                  selectedRange={state.selectedRange}
                  hoveredDate={state.hoveredDate}
                  theme={theme}
                  onClickDate={(iso) =>
                    dispatch({ type: "CLICK_DATE", payload: iso })
                  }
                  onHoverDate={(iso) =>
                    dispatch({ type: "SET_HOVERED_DATE", payload: iso })
                  }
                  onToggleWeekStart={() =>
                    dispatch({ type: "TOGGLE_WEEK_START" })
                  }
                />

                {/* Range summary bar */}
                <RangeSummaryBar
                  theme={theme}
                  selectedRange={state.selectedRange}
                  onClear={() => dispatch({ type: "CLEAR_SELECTION" })}
                />
              </div>

              {/* MOBILE — Notes panel */}
              <div
                className="md:hidden w-full border-t"
                style={{ borderColor: dividerColor }}
              >
                <NotesPanel
                  state={state}
                  theme={theme}
                  setActiveTab={(tab) =>
                    dispatch({ type: "SET_ACTIVE_NOTE_TAB", payload: tab })
                  }
                />
              </div>
            </div>
          </div>
        </CalendarCard>

        {/* Footer */}
        <p
          className="text-center text-[10px] mt-4 tracking-[0.15em] uppercase font-medium"
          style={{ color: state.isDark ? "#333355" : "#CCCCCC" }}
        >
          Interactive Calendar · {state.currentYear}
        </p>
      </div>
    </div>
  );
}
