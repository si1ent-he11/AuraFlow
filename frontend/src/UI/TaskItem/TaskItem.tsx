import { useNavigate } from "react-router-dom";
import type { Task } from "../../types/task";
import cl from "./TaskItem.module.css"

interface TaskItemType {
    task: Task;
}

const TaskItem = ({task}: TaskItemType) => {
    const navig = useNavigate();
    return (
        <div className={cl.container} onClick={() => {
            navig(`/spaces/task-group/tasks/${task.id}`, { state: { task: task } });
        }}>
            <div className={cl.info_container}>
                <h1 className={cl.title}>{task.title}</h1>
                <h3 className={cl.info}>{task.description}</h3>
            </div>
        </div>
    )
}

export default TaskItem;