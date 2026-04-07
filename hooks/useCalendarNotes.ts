import { useState, useEffect, useRef } from 'react';

export function useCalendarNotes(key: string | null) {
  const [prevKey, setPrevKey] = useState(key);
  const [note, setNote] = useState<string>(() => {
    if (!key || typeof window === 'undefined') return '';
    return localStorage.getItem(key) ?? '';
  });
  const [showSaved, setShowSaved] = useState(false);
  const isInitialMount = useRef(true);

  // 1. Sync state when key changes during render to avoid cascading renders warning
  if (key !== prevKey) {
    setPrevKey(key);
    const saved = (key && typeof window !== 'undefined') ? localStorage.getItem(key) : '';
    setNote(saved ?? '');
    // We update refs in an effect instead of render to satisfy ESLint
  }

  // 2. Mark as initial mount (to skip saving) when key changes
  useEffect(() => {
    isInitialMount.current = true;
  }, [key]);

  // 3. Debounced save effect
  useEffect(() => {
    if (!key) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      localStorage.setItem(key, note);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1500);
    }, 600);

    return () => clearTimeout(handler);
  }, [note, key]);

  return { note, setNote, showSaved };
}