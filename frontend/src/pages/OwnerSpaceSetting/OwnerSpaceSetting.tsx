import { useNavigate } from "react-router-dom";
import InviteList from "../../components/InviteList/InviteList";
import useActiveSpace from "../../state/useActiveSpace";
import useGetInvites from "../../hooks/invite/useGetInvites";
import cl from "./OwnerSpaceSetting.module.css"
import OwnerProfileSetting from "../../components/OwnerProfileSetting/OwnerProfileSetting";
import CreateInviteForm from "../../components/CreateInviteForm/CreateInviteForm";

const OwnerSpaceSetting = () => {
    const spaceId = useActiveSpace(state => state.spaceId)
    const navig = useNavigate()

    const {data: invites, isError} = useGetInvites(spaceId!)
    if (isError) {
        navig("/error")
        return;
    }

    return ( 
        <div className={cl.container}>
            <h1 className={cl.title}>Space Setting</h1>
            <OwnerProfileSetting />
            <div className={cl.separator}></div>
            <h1 className={cl.title}>Create Invite</h1>
            <CreateInviteForm spaceId={spaceId!}/>
            <div className={cl.separator}></div>
            <h1 className={cl.title}>Invites</h1>
            <InviteList invites={invites}/>
        </div>
    )
}

export default OwnerSpaceSetting;