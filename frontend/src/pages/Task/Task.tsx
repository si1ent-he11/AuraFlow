import { useLocation } from "react-router-dom";
import type { Task } from "../../types/task";
import cl from "./Task.module.css"

const getLocalDate = (utc?: string) => {
    if (!utc) return "";
    const date = new Date(utc);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const TaskPage = () => {
    const location = useLocation();
    const task = location.state?.task as Task;

    return (
        <div className={cl.container}>
            <div>
                <h1 className={cl.title}>{task.title}</h1>
                <div className={cl.separator}></div>
                <h3 className={cl.info}>{task.description}</h3>
                <h3 className={cl.info}>{getLocalDate(task.expires_at)}</h3>
            </div>
        </div>
    )
}

export default TaskPage;