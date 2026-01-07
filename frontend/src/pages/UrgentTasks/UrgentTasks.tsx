import { useMemo, useState } from "react";
import TaskItem from "../../ui/TaskItem/TaskItem";
import Input from "../../ui/TextInput/Input";
import { useGetTasksFromSpace } from "../../hooks/task/useTaskGroup";
import Loader from "../../ui/Loader/Loader";
import cl from "./UrgentTasks.module.css"
import useActiveSpace from "../../state/useActiveSpace";

const UrgentTasks = () => {
    const spaceId = useActiveSpace(state => state.spaceId);
    const {data, isLoading} = useGetTasksFromSpace(spaceId)
    const [searchValue, setSearchValue] = useState<string>("")

    const filteredData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        
        if (searchValue === "") return data;

        return data.filter(v =>
            v.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [data, searchValue])

    if (isLoading) return <Loader />

    return(
        <div className={cl.container}>
            <div className={cl.input_container}>
                <Input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)} 
                    placeholder="search... 🔍"
                />
            </div>

            <div className={cl.list}>
                {filteredData?.map((v) => (
                    <TaskItem key={v.id} task={v}/>
                ))}
            </div>
        </div>
    )
}

export default UrgentTasks;