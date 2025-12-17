import { fetchWithAuth } from "./auth";

export const getUser = async () => {
    return await fetchWithAuth("http://localhost:8080/users/", {
        method: "GET",
        credentials: "include",
    });
}