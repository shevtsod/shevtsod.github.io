import { create } from 'zustand';

interface AppState {
  showBoot: boolean;
  setShowBoot: (showBoot: boolean) => void;

  showHeaderOnScroll: boolean;
  setShowHeaderOnScroll: (showHeaderOnScroll: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  showBoot: false,
  setShowBoot: (showBoot) => set((state) => ({ ...state, showBoot: showBoot })),

  showHeaderOnScroll: false,
  setShowHeaderOnScroll: (showHeaderOnScroll) =>
    set((state) => ({ ...state, showHeaderOnScroll })),
}));
