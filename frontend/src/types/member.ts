export interface MemberType {
    id: number;
    spaceId: number;
    userId: number;
    usernameInSpace: string;
    spaceRole: "owner" | "admin" | "member"
    joinedAt: string;
}

export interface ChangeMemberName {
    usernameInSpace: string;
}

export interface ConfirmationMember {
    spaceId: number;
    userId: number;
}

