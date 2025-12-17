import { create } from "zustand";
import type { UserType } from "../types/user";
import { persist } from "zustand/middleware";

interface useUserType {
    user: UserType | null;
    accessToken: string | null;

    setUser: (user: UserType) => void;
    setAccessToken: (accessToken: string) => void;
    logout: () => void;
}

const useUserStore = create<useUserType>()(persist((set) => ({
    user: null,
    accessToken: null,

    setUser: (user: UserType) => set(() => ({
        user: user
    })),
    setAccessToken: (accessToken) => set(()=>({
        accessToken: accessToken,    
    })),
    logout: () => set(() => ({
        user: null,
        accessToken: null,
    }))
}), {name:"storage"}))

export default useUserStore;