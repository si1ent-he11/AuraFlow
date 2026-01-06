import { useMutation, useQueryClient } from "@tanstack/react-query";
import { demoteMember } from "../../api/member";
import type { ConfirmationMember } from "../../types/member";

const useDemoteMember = () => {
    const client = useQueryClient()

    return useMutation<void, Error, ConfirmationMember>(
        {
            mutationFn: demoteMember,
            onSuccess: (_, variables) => {
                client.invalidateQueries({queryKey: ["members", variables.spaceId]})
            }
        }
    )
}

export default useDemoteMember;