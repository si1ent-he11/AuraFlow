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

export interface SpaceNameDTO {
    spaceName: string;
}

export interface SpaceDescriptionDTO {
    spaceDescription: string;
}
