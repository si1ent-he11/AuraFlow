import { useNavigate } from "react-router-dom";
import type { Task } from "../../types/task";
import cl from "./TaskItem.module.css"
import { useDeleteTask } from "../../hooks/task/useTaskGroup";
import useMember from "../../state/useMember";
import useActiveSpace from "../../state/useActiveSpace";
import useGetMemberByMemberId from "../../hooks/member/useGetMemberByMemberId";

interface TaskItemType {
    task: Task;
}

const getLocalDate = (utc?: string) => {
    if (!utc) return "";
    const date = new Date(utc);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const TaskItem = ({task}: TaskItemType) => {
    const navig = useNavigate()
    const {mutate, isPending} = useDeleteTask(task.task_group_id)
    
    const member = useMember(state => state.member) 
    const memberId = member?.id ?? null;

    const spaceId = useActiveSpace(state => state.spaceId)
    const {data: currentMemberSetting} = useGetMemberByMemberId(memberId, spaceId)

    return (
        <div className={cl.container} onClick={() => {
            navig(`/spaces/task-group/tasks/${task.id}`, { state: { task: task } });
        }}>
            <div className={cl.info_container}>
                <h1 className={cl.title}>{task.title}</h1>
                <h3 className={cl.info}>{task.description}</h3>
                <h3 className={cl.info}>{task.expires_at !== null ? getLocalDate(task.expires_at) : "the delivery time has not been set"}</h3>
            </div>
            {
                currentMemberSetting?.spaceRole === 'admin' || currentMemberSetting?.spaceRole === "owner" ? 
                <button
                    className={cl.deleteBtn}
                    onClick={(e) => {
                        e.stopPropagation()
                        mutate(task.id)
                    }}
                    disabled={isPending}
                >
                    ✕
                </button>
                :
                null
            }
        </div>
    )
}

export default TaskItem;