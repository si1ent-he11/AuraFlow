import type { UserDTO } from "../types/user";
import { fetchWithAuth } from "./auth";

export const getUser = async () => {
    return await fetchWithAuth("http://localhost:8080/users/", {
        method: "GET",
        credentials: "include",
    });
}

export const getUserById = async (userId: string) => {
    return await fetchWithAuth("http://localhost:8080/users/"+userId, {
        method: "GET",
        credentials: "include",
    });
}

export const updateUser = async (newUserProfile: UserDTO) => {
    console.log(newUserProfile)
    return await fetchWithAuth("http://localhost:8080/users/", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(newUserProfile)
    });
}