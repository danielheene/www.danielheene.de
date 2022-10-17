import React, { ReactNode } from 'react';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type AppStore = {
  isRouteChanging: boolean;
  showNavigation: boolean;
  headerHeight: number | null;
  settings: {};
  setRouteChanging: (changing: boolean) => void;
  setShowNavigation: (show: boolean) => void;
  setHeaderHeight: (height: number) => void;
};

export const useAppStore = create<AppStore, [['zustand/immer', never]]>(
  immer((set) => ({
    isRouteChanging: false,
    showNavigation: false,
    headerHeight: null,
    settings: {},
    setRouteChanging: (changing) => set(() => ({ isRouteChanging: changing })),
    setShowNavigation: (show) => set(() => ({ showNavigation: show })),
    setHeaderHeight: (height) => set(() => ({ headerHeight: height })),
  }))
);
