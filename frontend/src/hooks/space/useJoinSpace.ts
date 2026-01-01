import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Invite } from "../../types/invite";
import { JoinSpace } from "../../api/space";

const useJoinSpace = () => {
    const client = useQueryClient()
    
    return useMutation<void, Error, Invite>({
        mutationFn: JoinSpace,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["spaces"]})
        }
    })
}

export default useJoinSpace;