import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoteMember } from "../../api/member";
import type { ConfirmationMember } from "../../types/member";

const usePromoteMember = () => {
    const client = useQueryClient()

    return useMutation<void, Error, ConfirmationMember>(
        {
            mutationFn: promoteMember,
            onSuccess: (_, variables) => {
                client.invalidateQueries({queryKey: ["members", variables.spaceId]})
            }
        }
    )
}

export default usePromoteMember;