import { useLocation, useParams } from "react-router-dom";
import type { Task } from "../../types/task";

const TaskPage = () => {
    const location = useLocation();
    const params = useParams();
    const task = location.state?.task as Task;
    
    console.log(params.id)
    console.log(task)

    return (
        <div>

        </div>
    )
}

export default TaskPage;