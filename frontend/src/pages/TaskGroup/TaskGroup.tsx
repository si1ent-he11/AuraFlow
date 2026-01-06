import { useParams } from "react-router-dom";
import cl from "./TaskGroup.module.css"
import { useGetTaskGroup } from "../../hooks/task/useTaskGroup";
import Loader from "../../ui/Loader/Loader";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import useMember from "../../state/useMember";
import TaskList from "../../components/TaskList/TaskList";

const TaskGroup = () => {
    const params = useParams()
    const tasksGroupId = params.id ? Number(params.id) : null;
    const {data, isLoading} = useGetTaskGroup(tasksGroupId)
    const member = useMember(state => state.member)

    if (isLoading) return <Loader />

    return (
        <div className={cl.container}>
            <div className={cl.header}>
                <h1 className={cl.title}>{data?.task_group_name}</h1>
            </div>
            {
                member?.spaceRole == "admin" || member?.spaceRole == "owner" 
                ?
                <div className={cl.form_container}>
                    <CreateTaskForm taskGroupId={tasksGroupId!}/>
                </div>
                :
                null
            }
            <div className={cl.input_container}>
                <TaskList groupId={tasksGroupId} />
            </div>
        </div>
    )
}

export default TaskGroup;