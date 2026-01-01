import { useQuery } from "@tanstack/react-query"
import { GetSpaceById } from "../../api/space"
import type { SpaceResp } from "../../types/space"

export const useGetSpace = (id: number) => {
    return useQuery<SpaceResp, Error>(
        {
            queryFn: () => GetSpaceById(id),
            queryKey: ["spaces", id]
        }
    )
}