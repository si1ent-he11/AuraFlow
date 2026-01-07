import { useNavigate } from "react-router-dom"
import useActiveSpace from "../../../state/useActiveSpace"
import { useModal } from "../../../state/useModal"
import cl from "./TaskGroupSetting.module.css"
import Button from "../../../ui/Button/Button"
import ConfirmationInput from "../../ConfirmationInput/ConfirmationInput"
import { useState } from "react"
import { useDeleteTaskGroup, useUpdateTaskGroupTitle } from "../../../hooks/task/useTaskGroup"

export interface TaskGroupSettingType {
    taskGroupId: number;
}

const TaskGroupSetting = ({taskGroupId}: TaskGroupSettingType) => {
    const navig = useNavigate()
    const [newTaskGroupTitle, setNewTaskGroupTitle] = useState<string>("")
    const {closeModal} = useModal()
    const spaceId = useActiveSpace(state => state.spaceId)

    if (!spaceId) {
        navig("/error")
        return null;
    }

    const {mutate: updateTaskGroupTitle} = useUpdateTaskGroupTitle(spaceId, taskGroupId)
    const {mutate: deleteTaskGroup} = useDeleteTaskGroup(spaceId)

    return (
        <div className={cl.modal_container}>
            <div className={cl.input_container}>
                <p>Update group title</p>
                <ConfirmationInput value={newTaskGroupTitle} setValue={setNewTaskGroupTitle} onClick={
                    () => {
                        updateTaskGroupTitle(newTaskGroupTitle)
                        closeModal()
                    }
                }/>
            </div>
            <div className={cl.separator}></div>
            <div className={cl.info_container}>
                <p>Delete task group</p>
                <Button onClick={() => {
                    deleteTaskGroup(taskGroupId)
                    closeModal()
                }}>Delete</Button>
            </div>
        </div>
    )
}

export default TaskGroupSetting;