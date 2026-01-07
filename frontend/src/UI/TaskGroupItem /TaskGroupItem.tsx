import { useNavigate } from "react-router-dom";
import type { TaskGroup } from "../../types/task"
import cl from "./TaskGroupItem.module.css"
import useGetMemberByMemberId from "../../hooks/member/useGetMemberByMemberId";
import { useGetTaskGroup } from "../../hooks/task/useTaskGroup";
import Loader from "../Loader/Loader";
import { useModal } from "../../state/useModal";

interface TaskGroupItemType {
    taskGroup: TaskGroup;
    currentUserRole?: string;
}

const TaskGroupItem = ({taskGroup, currentUserRole}: TaskGroupItemType) => {
    const navig = useNavigate()
    const openModal = useModal(state => state.openModal)
    const {data} = useGetTaskGroup(taskGroup.id)
    const taskGroupPwnerId = data ? data.created_by : null;
    const spaceId = data ? data.space_id : null;
    const {data: member, isLoading} = useGetMemberByMemberId(taskGroupPwnerId, spaceId)

    if (isLoading) return <Loader />

    return (
        <div
            key={taskGroup.id} 
            className={cl.container}
            onClick={() => navig(`/spaces/task-group/${taskGroup.id}`)}
        >
            { currentUserRole === "owner" || currentUserRole === "admin" ? 
                <button 
                    className={cl.delete_btn}
                    onClick={e => {
                        e.stopPropagation()
                        openModal("taskGroupSettingType", {taskGroupId: taskGroup.id})
                    }}
                >
                    ×
                </button>
                :
                null
            }
            <div className={cl.first_part}>
                <p className={cl.title}>{taskGroup.task_group_name}</p>
            </div>
            <div className={cl.separator}></div>
            <div className={cl.second_part}>
                <p className={cl.info}>{member?.usernameInSpace}</p>
                <p className={cl.info}>{`${taskGroup.min_score} / ${taskGroup.max_score}`}</p>
            </div>
        </div>
    )
}

export default TaskGroupItem;
 