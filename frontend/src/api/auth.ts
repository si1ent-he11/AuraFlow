import useUserStore from "../state/useUser";
import type { AccessToken, SignUpResponse } from "../types/api";
import type { UserLoginRequestDTO, UserType } from "../types/user";

export const signUp = async (user: UserType) => {
    const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
        credentials: "include"
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error);
    }
    
    return res.json() as Promise<SignUpResponse>
} 

export const signIn = async (userDTO: UserLoginRequestDTO) => {
    const res = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDTO),
        credentials: "include"
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error);
    }

    return res.json() as Promise<AccessToken>;
}

export const refresh = async () => {
    const res = await fetch("http://localhost:8080/auth/refresh",
        {
            method: "POST",
            credentials: "include",
        }
    )
    
    if (!res.ok) {
        throw new Error("refresh failed");
    }

    return res.json() as Promise<AccessToken>;
}

export const fetchWithAuth = async (info: RequestInfo, init: RequestInit = {} ) => {
    const { accessToken, setAccessToken } = useUserStore.getState()

    const makeRequest = (token: string | null) =>
        fetch(info, {
            ...init,
            credentials: "include",
            headers: {
                ...init.headers,
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

    let res = await makeRequest(accessToken)

    if (res.status === 401) {
        const newToken = await refresh()
        setAccessToken(newToken.accessToken)
        res = await makeRequest(newToken.accessToken)
    }

    if (!res.ok) {
        throw new Error(`request failed: ${res.status}`)
    }

    return res.json() as Promise<any>;
}