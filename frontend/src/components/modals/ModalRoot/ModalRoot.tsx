import { useModal } from "../../../state/useModal";
import AddSpace from "../AddSpace/AddSpace";
import AddTaskGroup, { type AddTaskGroupType } from "../AddTaskGroup/AddTaskGroup";
import ChangeProfile from "../ChangeProfile/ChangeProfile";
import ConfiguresUser, { type ConfiguresUserType } from "../ConfiguresUser/ConfiguresUser";
import DeleteSpace, { type DeleteProps } from "../DeleteSpace/DeleteSpace";
import Error from "../Error/Error";
import GradeModal, { type GradeModalProps } from "../TableModal/TableModal";
import TaskGroupSetting, { type TaskGroupSettingType } from "../TaskGroupSetting/TaskGroupSetting";
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
                { type == "changeProfile" && <ChangeProfile /> }
                { type == "grade" && <GradeModal {...props as GradeModalProps} /> }
                { type == "configuresUser" && <ConfiguresUser {...props as ConfiguresUserType} />}
                { type == "addTask" && <AddTaskGroup {...props as AddTaskGroupType} />}
                {type == "taskGroupSettingType" && <TaskGroupSetting {...props as TaskGroupSettingType} />}
            </div>
        </div>
    )
}

export default ModalRoot;