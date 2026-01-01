import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateSpace } from "../../api/space"

export const useCreateSpace = () => {
    const client = useQueryClient()
    
    return useMutation(
        {
            mutationFn: CreateSpace,
            onSuccess: () => {
                client.invalidateQueries({queryKey: ["spaces"]})
            }
        }
    )
}