import useMember from "../../state/useMember";
import type { MemberType } from "../../types/member";
import Button from "../Button/Button";
import cl from "./MemberItem.module.css"

interface MemberTypeProps {
    member: MemberType;
    onClick: () => void;
    children: React.ReactNode;
}

const MemberItem = ({member, onClick, children}: MemberTypeProps) => {
    const myMember = useMember(state => state.member)
    return (
        <div className={cl.container}>
            <div className={cl.info_container}>
                <h1 className={cl.title}>{member.usernameInSpace}</h1>
                <h3 className={cl.info}>{member.spaceRole}</h3>
            </div>
            {
                myMember?.spaceRole == "owner" 
                ? 
                <Button onClick={onClick}>{children}</ Button>
                : 
                null
            }
        </div>
    )
}

export default MemberItem;