import { create } from 'zustand';
import type { User } from '../types';

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const userApi = {
  setUser: (user: User) => {
    useUserStore.getState().setUser(user);
  },
  clearUser: () => {
    useUserStore.getState().clearUser();
  },
};
