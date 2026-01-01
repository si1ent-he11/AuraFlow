import { useModal } from "../../../state/useModal";
import AddSpace from "../AddSpace/AddSpace";
import DeleteSpace, { type DeleteProps } from "../DeleteSpace/DeleteSpace";
import Error from "../Error/Error";
import UserSetting from "../UserSetting/UserSetting";
import cl from "./ModalRoot.module.css"

const ModalRoot = () => {
    const {isOpen, type, props, closeModal} = useModal()

    if (!isOpen) {
        return null
    }

    return (
        <div className={cl.modal_container} onClick={closeModal}>
            <div className={cl.modal} onClick={e => e.stopPropagation()}>
                { type == "add" && <AddSpace/> }
                { type == "delete" && <DeleteSpace {...props as DeleteProps}/> }
                { type == "error" && <Error /> }
                { type == "setProfile" && <UserSetting /> }
            </div>
        </div>
    )
}

export default ModalRoot;