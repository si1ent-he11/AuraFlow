import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMemberNameInSpace } from "../../api/member";
import type { ChangeMemberName } from "../../types/member";
import useMember from "../../state/useMember";

const useChangeMemberName = (spaceId: number) => {
    const client = useQueryClient()
    const setMember = useMember(state => state.setMember)
    const member = useMember(state => state.member)

    return useMutation<void, Error, ChangeMemberName>(
        {
            mutationFn: (memberName: ChangeMemberName) => updateMemberNameInSpace(spaceId, memberName),
            onSuccess: (_, variables) => {
                client.invalidateQueries({queryKey: ["members", spaceId]})
                member!.usernameInSpace = variables.usernameInSpace
                setMember(member!)
            }
        }
    )
}

export default useChangeMemberName;