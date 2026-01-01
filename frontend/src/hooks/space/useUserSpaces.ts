import { useQuery } from "@tanstack/react-query"
import { GetSpaceIdsByUserId } from "../../api/space"
import type { SpaceItemDTO } from "../../types/space"

export const useUserSpaces = () => {
    return useQuery<SpaceItemDTO[], Error>({
        queryFn: GetSpaceIdsByUserId,
        queryKey: ["spaces"],
    })
}