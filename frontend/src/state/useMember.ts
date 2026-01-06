import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { MemberType } from "../types/member";

interface useMemberType {
    member: MemberType | null;
    setMember: (member: MemberType) => void;
    clearMember: () => void; 
}

const useMember = create<useMemberType>()(persist(set => ({
    member: null,
    setMember: (member: MemberType) => set(() => ({
        member: member,
    })), 
    clearMember: () => set(() => ({
        member: null,
    })),
}), {name:"member"}))

export default useMember;