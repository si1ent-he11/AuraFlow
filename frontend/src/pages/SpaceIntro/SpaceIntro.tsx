import { useParams } from "react-router-dom";
import { useGetSpace } from "../../hooks/space/useGetSpace";
import cl from "./SpaceIntro.module.css"
import { useModal } from "../../state/useModal";
import { useEffect } from "react";
import Loader from "../../ui/Loader/Loader";
import Button from "../../ui/Button/Button";
import useActiveSpace from "../../state/useCurrentSpace";

const SpacePage = () => {
    const param = useParams()
    const id = Number(param.id)
    const {data, isLoading, error} = useGetSpace(id)
    const {openModal} = useModal()
    const setSpaceId = useActiveSpace(state => state.setSpaceId)
    useEffect(() => {
        setSpaceId(id)
    }, [id, setSpaceId])

    useEffect(() => {
        if ((!data && !isLoading) || error) {
            openModal("error", {});
        }
    }, [data, isLoading, error, openModal]);

    const getLocalDate = (utc?: string) => {
        if (!utc) return "";
        const date = new Date(utc);
        return date.toLocaleString()
    }

    return (
        <div className={cl.container}>
            {isLoading && <Loader className={cl.loader}/>}
            <h1 className={cl.title}>{data?.spaceName}</h1>
            <div className={cl.separator}></div>
            <div className={cl.info_container}>
                { data?.ownerName  ? <p className={cl.date_info}>owner email: {data.ownerEmail}</p> : null}
                { data?.createdAt  ? <p className={cl.date_info}>{getLocalDate(data.createdAt)}</p> : null}
            </div>
            <div className={cl.separator}></div>
            <Button className={cl.enter_button}>Enter</Button>
        </div>
    )
}

export default SpacePage;