import type { Invite } from "../types/invite"
import type { CreateSpaceDTO, SpaceDescriptionDTO, SpaceNameDTO } from "../types/space"
import { fetchWithAuth } from "./auth"

export const GetSpaceIdsByUserId = async () => {
    return fetchWithAuth("http://localhost:8080/spaces/", {
        method: "GET",
        credentials: "include",
    })
}

export const GetSpaceById = async (spaceId: number) => {
    return fetchWithAuth("http://localhost:8080/spaces/"+spaceId, {
        method: "GET",
        credentials: "include",
    })
}

export const CreateSpace = async (spaceDTO: CreateSpaceDTO) => {
    return fetchWithAuth("http://localhost:8080/spaces/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spaceDTO),
    })
}

export const JoinSpace = async (invite: Invite) => {
    return fetchWithAuth("http://localhost:8080/spaces/members", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(invite),
    })
}

export const ChangeSpaceName = async (spaceId: number, newSpaceName: SpaceNameDTO) => {
    return fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/name`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSpaceName),
    })
}

export const ChangeSpaceDesc = async (spaceId: number, newSpaceDesc: SpaceDescriptionDTO) => {
    return fetchWithAuth(`http://localhost:8080/spaces/${spaceId}/desc`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSpaceDesc),
    })
}

export const LeaveSpace = async (spaceId: number) => {
    return fetchWithAuth("http://localhost:8080/spaces/"+spaceId, {
        method: "DELETE",
        credentials: "include",
    })
}
