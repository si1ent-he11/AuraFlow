import useActiveSpace from "../../../state/useActiveSpace";
import cl from "./ConfiguresUser.module.css"
import { useNavigate } from "react-router-dom";
import type { MemberType } from "../../../types/member";
import { useModal } from "../../../state/useModal";
import useDeleteMember from "../../../hooks/member/useDeleteMember";
import Button from "../../../ui/Button/Button";
import usePromoteMember from "../../../hooks/member/usePromoteMember";
import useDemoteMember from "../../../hooks/member/useDemoteMember";

export interface ConfiguresUserType {
    member: MemberType;
}

const ConfiguresUser = ({member}: ConfiguresUserType) => {
    const navig = useNavigate()
    const {closeModal} = useModal()
    const spaceId = useActiveSpace(state => state.spaceId)
    const {mutate: promote} = usePromoteMember()
    const {mutate: demote} = useDemoteMember()
    const {mutate} = useDeleteMember()
    
    if (!spaceId) {
        navig("/error")
        return null;
    }

    const changeRole = () => {
        if (member.spaceRole == "member") {
            promote({
                spaceId: spaceId,
                userId: member.userId,
            })
        } else {
            demote({
                spaceId: spaceId,
                userId: member.userId,
            })
        }

        closeModal()
    }

    return (
        <div className={cl.modal_container}>
            <div className={cl.info_container}>
                <p>{member.spaceRole == "member" ? "Promote" : "Demote"} member</p>
                <Button onClick={changeRole}>{member.spaceRole == "member" ? "Promote" : "Demote"}</Button>
            </div>
            <div className={cl.separator}></div>
            <div className={cl.info_container}>
                <p>Delete member</p>
                <Button onClick={() => {
                    mutate({
                        spaceId: spaceId,
                        userId: member.userId,
                    })
                    closeModal()
                }}>Delete</Button>
            </div>
        </div>
    )
}

export default ConfiguresUser;