import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SpaceNameDTO } from "../../types/space";
import { ChangeSpaceName } from "../../api/space";

const useChangeSpaceName = (spaceId: number) => {
    const client = useQueryClient()
    
    return useMutation<void, Error, SpaceNameDTO>(
        {
            mutationFn: (spaceName: SpaceNameDTO) => ChangeSpaceName(
                spaceId, 
                spaceName,
            ),
            onSuccess: () => {
                client.invalidateQueries({queryKey:["spaces", spaceId]})
            }
        }
    )
}

export default useChangeSpaceName;