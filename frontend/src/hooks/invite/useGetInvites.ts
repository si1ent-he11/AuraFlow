import { useQuery } from "@tanstack/react-query"
import { getInvite } from "../../api/invite"
import type { InviteDTO } from "../../types/invite"

const useGetInvites = (spaceId: number) => {
    return useQuery<InviteDTO[], Error>(
        {
            queryFn: () => getInvite(spaceId),
            queryKey: ["invites"]
        }
    )
}

export default useGetInvites