import { useMemo, useState } from "react";
import Input from "../../ui/TextInput/Input";
import cl from "./TaskList.module.css"
import { useGetTasksFromGroup } from "../../hooks/task/useTaskGroup";
import TaskItem from "../../ui/TaskItem/TaskItem";

interface TaskListType {
    groupId: number | null;
}

const TaskList = ({groupId}: TaskListType) => {
    const [searchValue, setSearchValue] = useState<string>("")

    const {data} = useGetTasksFromGroup(groupId)

    const filteredData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        
        if (searchValue === "") return data;

        return data.filter(v =>
            v.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [data, searchValue]);

    console.log(filteredData)

    return(
        <div className={cl.input_container}>
            <Input
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)} 
                placeholder="search... 🔍"
            />

            <div className={cl.list}>
                {filteredData?.map((v) => (
                    <TaskItem key={v.id} task={v}/>
                ))}
            </div>
        </div>
    )
}

export default TaskList;