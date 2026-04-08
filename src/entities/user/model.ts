import { create } from 'zustand';

export type User = {
  id: string;
  username: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()((set) => ({
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
