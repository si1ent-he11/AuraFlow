import { useNavigate } from "react-router-dom";
import MembersList from "../../components/MembersList/MembersList";
import { useGetMembers } from "../../hooks/member/useGetMembers";
import useActiveSpace from "../../state/useActiveSpace";
import Loader from "../../ui/Loader/Loader";
import cl from "./Members.module.css"

const Members = () => {
    const navig = useNavigate()
    const spaceId = useActiveSpace(state => state.spaceId)
    
    const {data: members, isLoading, isError}= useGetMembers(spaceId!)
    if (isError) {
        navig("/error")
        return;
    }

    if (isLoading) return <Loader />

    return (
        <div className={cl.members_container}>
            {
                members && <MembersList members={members} />
            }
        </div>
    )
}

export default Members;