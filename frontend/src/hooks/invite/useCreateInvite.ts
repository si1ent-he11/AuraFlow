import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvite } from "../../api/invite";
import type { createInviteForm } from "../../types/invite";

const useCreateInvite = (spaceId: number) => {
    const client = useQueryClient()
    return useMutation({
        mutationFn: (create: createInviteForm) => 
            createInvite({
                spaceId,
                hoursToExpire: create.hoursToExpire,
                maxUses: create.maxUses,
            }),
        onSuccess: () => {
            client.invalidateQueries({queryKey:["invites"]})
        }
    })
}

export default useCreateInvite;