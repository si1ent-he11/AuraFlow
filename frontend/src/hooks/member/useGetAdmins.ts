import { useQuery } from "@tanstack/react-query"
import type { MemberType } from "../../types/member"
import { getAdmins } from "../../api/member"

export const useGetAdmins = (spaceId: number) => {
    return useQuery<MemberType[], Error>(
        {
            queryFn: () => getAdmins(spaceId),
            queryKey: ["members", spaceId]
        }
    )
}