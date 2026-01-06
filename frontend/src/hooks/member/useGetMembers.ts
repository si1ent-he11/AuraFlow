import { useQuery } from "@tanstack/react-query"
import type { MemberType } from "../../types/member"
import { getMembers } from "../../api/member"

export const useGetMembers = (spaceId: number) => {
    return useQuery<MemberType[], Error>(
        {
            queryFn: () => getMembers(spaceId),
            queryKey: ["members", spaceId]
        }
    )
}