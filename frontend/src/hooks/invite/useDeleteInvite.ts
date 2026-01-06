import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvite } from "../../api/invite";
import type { DeleteInviteDTO } from "../../types/invite";

const useDeleteInvite = () => {
    const client = useQueryClient()
    return useMutation<void, Error, DeleteInviteDTO>({
        mutationFn: deleteInvite,
        onSuccess: () => {
            client.invalidateQueries({queryKey:["invites"]})
        }
    })
}

export default useDeleteInvite;