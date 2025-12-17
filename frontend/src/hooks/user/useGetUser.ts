import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../api/user"
import type { Error } from "../../types/api"
import type { UserType } from "../../types/user"

export const useGetUser = (accessToken: string | null) => {
    return useQuery<UserType, Error>({
        queryKey: ["user", accessToken],
        enabled: !!accessToken,
        queryFn: () => {
            if (!accessToken) {
                throw new Error("invalid token")
            } 
            return getUser();
        },
    })
}
