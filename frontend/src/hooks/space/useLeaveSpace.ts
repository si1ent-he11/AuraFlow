import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LeaveSpace } from "../../api/space"

export const useLeaveSpace = (id: number) => {
    const client = useQueryClient()
    
    return useMutation(
        {
            mutationFn: () => LeaveSpace(id),
            onSuccess: () => {
                client.invalidateQueries({queryKey: ["spaces"]})
            }
        }
    )
}