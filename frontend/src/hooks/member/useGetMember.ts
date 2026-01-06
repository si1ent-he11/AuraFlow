import { useQuery } from "@tanstack/react-query"
import type { MemberType } from "../../types/member"
import { getMember } from "../../api/member"

export const useGetMember = (spaceId: number) => {
    return useQuery<MemberType, Error>(
        {
            queryFn: () => getMember(spaceId),
            queryKey: ["members", spaceId]
        }
    )
}