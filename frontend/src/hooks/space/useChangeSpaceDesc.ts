import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeSpaceDesc } from "../../api/space";
import type { SpaceDescriptionDTO } from "../../types/space";

const useChangeSpaceDesc = (spaceId: number) => {
    const client = useQueryClient()
    
    return useMutation<void, Error, SpaceDescriptionDTO>(
        {
            mutationFn: (spaceDesc: SpaceDescriptionDTO) => ChangeSpaceDesc(
                spaceId, 
                spaceDesc,
            ),
            onSuccess: () => {
                client.invalidateQueries({queryKey:["spaces", spaceId]})
            }
        }
    )
}

export default useChangeSpaceDesc;