export interface SpaceResp {
    id: number;
    spaceName: string;
    spaceDescription: string;
    ownerName: string;
    ownerEmail: string;
    createdAt: string;
}

export interface SpaceItemDTO {
    id: number;
    spaceName: string;
}

export interface CreateSpaceDTO {
    spaceName: string;
    spaceDescription?: string;
    usernameInSpace?: string;
}

export interface SpaceMemberType {
    id: number;
    spaceId: number;
    userId: number;
    role: "owner" | "admin" | "member"
    joinedAt: string;
}

