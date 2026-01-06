import type { ChangeMemberName, ConfirmationMember } from "../types/member";
import { fetchWithAuth } from "./auth";

export const getMember = async (spaceId: number) => {
    return await fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/members/me`, {
        method: "GET",
        credentials: "include",
    });
}

export const getMembers = async (spaceId: number) => {
    return await fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/members`, {
        method: "GET",
        credentials: "include",
    });
}

export const getMemberByMemberId = async (memberId: number, spaceId: number) => {
    return await fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/members/${memberId}`, {
        method: "GET",
        credentials: "include",
    });
}

export const getAdmins = async (spaceId: number) => {
    return await fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/admins`, {
        method: "GET",
        credentials: "include",
    });
}

export const updateMemberNameInSpace = async (spaceId: number, usernameInSpace: ChangeMemberName) => {
    return await fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/members`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameInSpace: usernameInSpace.usernameInSpace }),
    })
}

export const promoteMember = async (member: ConfirmationMember) => {
    return fetchWithAuth("http://localhost:8080/spaces/members/promote", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
    })
}

export const demoteMember = async (member: ConfirmationMember) => {
    return fetchWithAuth("http://localhost:8080/spaces/members/demote", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
    })
}

export const deleteMember = async (member: ConfirmationMember) => {
    return fetchWithAuth("http://localhost:8080/spaces/members", {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
    })
}
