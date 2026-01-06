import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../../api/member";
import type { ConfirmationMember } from "../../types/member";

const useDeleteMember = () => {
    const client = useQueryClient()

    return useMutation<void, Error, ConfirmationMember>(
        {
            mutationFn: deleteMember,
            onSuccess: (_, variables) => {
                client.invalidateQueries({queryKey: ["members", variables.spaceId]})
            }
        }
    )
}

export default useDeleteMember;