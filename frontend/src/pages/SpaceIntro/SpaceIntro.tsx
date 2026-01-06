import { useNavigate, useParams } from "react-router-dom";
import { useGetSpace } from "../../hooks/space/useGetSpace";
import cl from "./SpaceIntro.module.css"
import { useModal } from "../../state/useModal";
import { useEffect } from "react";
import Loader from "../../ui/Loader/Loader";
import Button from "../../ui/Button/Button";
import useActiveSpace from "../../state/useActiveSpace";
import { useGetMember } from "../../hooks/member/useGetMember";
import useMember from "../../state/useMember";

const SpaceIntro = () => {
    const navig = useNavigate()
    const {openModal} = useModal()
    const setMemberState = useMember(state => state.setMember)
    const setSpaceId = useActiveSpace(state => state.setSpaceId)
    const param = useParams()
    const id = Number(param.id)
    const {data: space, isLoading, error} = useGetSpace(id)
    const {data: member, isError} = useGetMember(id)

    useEffect(() => {
        if (isError) {
            navig("/error")
            return;
        }

        if (member) {
            setMemberState(member);
        }
    }, [member, isError, setMemberState, navig])

    useEffect(() => {
        setSpaceId(id)
    }, [id, setSpaceId])

    useEffect(() => {
        if ((!space && !isLoading) || error) {
            openModal("error", {})
        }
    }, [space, isLoading, error, openModal])

    const getLocalDate = (utc?: string) => {
        if (!utc) return ""
        const date = new Date(utc)
        return date.toLocaleString()
    }

    return (
        <div className={cl.container}>
            {isLoading && <Loader className={cl.loader}/>}
            <h1 className={cl.title}>{space?.spaceName}</h1>
            <div className={cl.separator}></div>
            <div className={cl.info_container}>
                { space?.ownerName  ? <p className={cl.date_info}>owner email: {space.ownerEmail}</p> : null}
                { space?.spaceDescription  ? <p className={cl.date_info}>owner desc: {space.spaceDescription}</p> : null}
                { space?.createdAt  ? <p className={cl.date_info}>{getLocalDate(space.createdAt)}</p> : null}
            </div>
            <div className={cl.separator}></div>
            <Button className={cl.enter_button} onClick={() => navig("/spaces/"+id)}>Enter</Button>
        </div>
    )
}

export default SpaceIntro;