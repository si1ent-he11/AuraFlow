import { useQuery } from "@tanstack/react-query";
import { getMemberByMemberId } from "../../api/member";
import type { MemberType } from "../../types/member";

const useGetMemberByMemberId = (memberId: number | null, spaceId: number | null) => {
    return useQuery<MemberType, Error>({
        enabled: !!memberId && !!spaceId,
        queryFn: () => getMemberByMemberId(memberId!, spaceId!),
        queryKey: ["members", spaceId, memberId]
    })
}

export default useGetMemberByMemberId;