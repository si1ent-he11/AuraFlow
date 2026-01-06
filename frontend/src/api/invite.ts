import type { createInviteDTO, DeleteInviteDTO } from "../types/invite";
import { fetchWithAuth } from "./auth"

export const getInvite = (spaceId: number) => {
    return fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/invites`, {
        method: "GET",
        credentials: "include",
    });
}

export const createInvite = (spaceInfo: createInviteDTO) => {
    return fetchWithAuth(`http://localhost:8080/spaces/invites`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spaceInfo),
    });
}

export const deleteInvite = (invite: DeleteInviteDTO) => {
    return fetchWithAuth("http://localhost:8080/spaces/invites", {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(invite),
    });
}