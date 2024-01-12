import { create } from "zustand";

type State = {
  id: string;
};

type Action = {
  setId: (id: State["id"]) => void;
};

export const useAuth = create<State & Action>((set) => {
  return {
    id: "",
    setId: (id: string) => set({ id }),
  };
});
