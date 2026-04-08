import { useCallback, useRef } from 'react';
import { useSelectionStore } from '../store/selectionStore';

export function useHoverRange() {
  const setHoverDate = useSelectionStore(s => s.setHoverDate);
  const hoverTs = useSelectionStore(s => s.hoverTs);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setDebouncedHover = useCallback((ts: number | null) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // For clearing hover, do it immediately for snappy feel
    if (ts === null) {
      setHoverDate(null);
      return;
    }

    timerRef.current = setTimeout(() => {
      setHoverDate(ts);
    }, 15); // tiny debounce to avoid bombing React with updates if moving mouse wildly
  }, [setHoverDate]);

  return {
    hoverTs,
    setHoverDate: setDebouncedHover
  };
}
