import { useQuery } from "@tanstack/react-query"
import { GetSpaceById } from "../../api/space"
import type { SpaceResp } from "../../types/space"

export const useGetSpace = (id: number | null) => {
    return useQuery<SpaceResp, Error>(
        {
            enabled: !!id,
            queryFn: () => GetSpaceById(id!),
            queryKey: ["spaces", id]
        }
    )
}