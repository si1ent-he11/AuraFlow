import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useCurrentSpaceType {
    spaceId: number | null;
    setSpaceId: (spaceId: number) => void;
    clearCurrentSpace: () => void;
}

const useActiveSpace = create<useCurrentSpaceType>()(persist((set) => ({
    spaceId: null,
    setSpaceId: (spaceId) => set(() => ({
        spaceId: spaceId,  
    })),
    clearCurrentSpace: () => {set(() => ({
        spaceId: null,  
    }))}
}), {name:"current_space"}))

export default useActiveSpace;