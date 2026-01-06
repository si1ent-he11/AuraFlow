import { useNavigate } from "react-router-dom";
import { useGetSpace } from "../../../hooks/space/useGetSpace";
import { useLeaveSpace } from "../../../hooks/space/useLeaveSpace";
import useActiveSpace from "../../../state/useActiveSpace";
import { useModal } from "../../../state/useModal";
import Button from "../../../ui/Button/Button";
import Loader from "../../../ui/Loader/Loader";
import cl from "./DeleteSpace.module.css"

export interface DeleteProps {
    spaceId: number;
}

const DeleteSpace = ({spaceId}: DeleteProps) => {
    const {data, isLoading} = useGetSpace(spaceId)
    const {mutate} = useLeaveSpace(spaceId)
    const {closeModal} = useModal()
    const navig = useNavigate()
    const activeSpaceId = useActiveSpace(state => state.spaceId)

    const featching = () => {
        if (activeSpaceId == spaceId) {
            navig("/home")
        }
        mutate()
        closeModal()
    }

    return (
        <div className={cl.delete_modal_container}>
            {isLoading && <Loader />}
            <h1 className={cl.delete_modal_title}>Are you sure?</h1>
            <p className={cl.delete_modal_info}>spacename: <span className={cl.spacename}>{data ? data.spaceName : "error"}</span></p>
            <Button onClick={featching}>Delete</Button>
        </div>
    )
}

export default DeleteSpace;