import { create } from 'zustand';

interface SelectionState {
  startTs: number | null;
  endTs: number | null;
  hoverTs: number | null;
  selectDate: (ts: number) => void;
  setHoverDate: (ts: number | null) => void;
  resetSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  startTs: null,
  endTs: null,
  hoverTs: null,
  selectDate: (ts) => set((state) => {
    // Both selected or none selected -> start new selection
    if (!state.startTs || (state.startTs && state.endTs)) {
      return { startTs: ts, endTs: null, hoverTs: null };
    }
    // Start selected, if new ts < startTs, handle it explicitly or swap automatically
    if (ts < state.startTs) {
      return { startTs: ts, endTs: state.startTs, hoverTs: null };
    }
    return { endTs: ts, hoverTs: null };
  }),
  setHoverDate: (ts) => set((state) => {
    // Only update if hover differs, avoids unnecessary rendering
    if (state.hoverTs !== ts) {
      return { hoverTs: ts };
    }
    return state;
  }),
  resetSelection: () => set({ startTs: null, endTs: null, hoverTs: null })
}));
