import { useNavigate } from "react-router-dom";
import MembersList from "../../components/MembersList/MembersList";
import useActiveSpace from "../../state/useActiveSpace";
import Loader from "../../ui/Loader/Loader";
import { useGetAdmins } from "../../hooks/member/useGetAdmins";
import cl from "./Admins.module.css"

const Admins = () => {
    const navig = useNavigate()
    const spaceId = useActiveSpace(state => state.spaceId)

    const {data: members, isLoading, isError}= useGetAdmins(spaceId!)
    if (isError) {
        navig("/error")
        return;
    }

    return (
        <div className={cl.container}>
            {isLoading ? (
                <Loader />
            ) : (
                members && <MembersList members={members} />
            )}
        </div>
    )
}

export default Admins;