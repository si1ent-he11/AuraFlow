export interface Invite {
    inviteId: string;
	usernameInSpace?: string;
}

export interface InviteDTO {
    id: string;
	expiresAt?: string;
}

export interface DeleteInviteDTO {
    inviteId: string;
}

export interface createInviteDTO {
    spaceId: number;
    hoursToExpire: number;
    maxUses: number;
}

export interface createInviteForm {
    hoursToExpire: number;
    maxUses: number;
}