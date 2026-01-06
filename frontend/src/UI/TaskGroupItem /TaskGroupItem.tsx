import { useNavigate } from "react-router-dom";
import type { TaskGroup } from "../../types/task"
import cl from "./TaskGroupItem.module.css"
import useGetMemberByMemberId from "../../hooks/member/useGetMemberByMemberId";
import { useGetTaskGroup } from "../../hooks/task/useTaskGroup";
import Loader from "../Loader/Loader";

interface TaskGroupItemType {
    taskGroup: TaskGroup;
}

const TaskGroupItem = ({taskGroup}: TaskGroupItemType) => {
    const navig = useNavigate()
    
    const {data} = useGetTaskGroup(taskGroup.id)
    const memberId = data ? data.created_by : null;
    const spaceId = data ? data.space_id : null;
    const {data: member, isLoading} = useGetMemberByMemberId(memberId, spaceId)
    if (isLoading) return <Loader />

    return (
        <div
            key={taskGroup.id} 
            className={cl.container}
            onClick={() => navig(`/spaces/task-group/${taskGroup.id}`)}
        >
            <div className={cl.first_part}>
                <p className={cl.title}>{taskGroup.task_group_name}</p>
            </div>
            <div className={cl.separator}></div>
            <div className={cl.second_part}>
                <p className={cl.info}>{member?.usernameInSpace}</p>
            </div>
        </div>
    )
}

export default TaskGroupItem;
 