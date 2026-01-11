// src/stores/recentViews.ts
import { create } from "zustand";

export type RecentViewItem = {
  id: string;
  slug: string;
  title: string;
  image?: string;
  price?: number;
};

type State = {
  items: RecentViewItem[];
  add: (item: RecentViewItem) => void;
  clear: () => void;
};

const MAX = 8;

export const useRecentViews = create<State>((set, get) => ({
  items: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("recentViews") || "[]") : [],
  add: (item) => {
    const items = get().items.filter((i) => i.id !== item.id);
    items.unshift(item);
    const trimmed = items.slice(0, MAX);
    set({ items: trimmed });
    localStorage.setItem("recentViews", JSON.stringify(trimmed));
  },
  clear: () => {
    set({ items: [] });
    localStorage.removeItem("recentViews");
  },
}));
