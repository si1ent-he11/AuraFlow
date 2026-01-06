import useActiveSpace from "../../state/useActiveSpace";
import cl from "./TasksGroupsList.module.css"
import { useTaskGroup } from "../../hooks/task/useTaskGroup";
import Loader from "../../ui/Loader/Loader";
import { useModal } from "../../state/useModal";
import useMember from "../../state/useMember";
import TaskGroupItem from "../../ui/TaskGroupItem /TaskGroupItem";
import { useMemo, useState } from "react";
import Input from "../../ui/TextInput/Input";

const TaskGroupList = () => {
    const spaceId = useActiveSpace(state => state.spaceId);
    const { data: groups, isLoading } = useTaskGroup(spaceId);
    const member = useMember(state => state.member)
    const openModal = useModal(state => state.openModal)
    const [searchValue, setSearchValue] = useState<string>("")

    const filteredData = useMemo(() => {
        if (!Array.isArray(groups)) return [];
        
        if (searchValue === "") return groups;

        return groups.filter(v =>
            v.task_group_name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [groups, searchValue]);

    if (isLoading) return <Loader />

    return (
        <div className={cl.container}>
            <div className={cl.input_container}>
                <Input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)} 
                    placeholder="search... 🔍"
                />
            </div>
            <div className={cl.header}>
                <span className={cl.title}>Tasks groups</span>
                {
                    member?.spaceRole == "admin" || member?.spaceRole == "owner" 
                    ?
                    <button className={cl.add_space_button} onClick={() =>
                        openModal(("addTask"), {spaceID: spaceId, createdByMemberId: member!.id})}
                    >+</button>
                    :
                    null
                }
            </div>
            <div className={cl.list}>
                {filteredData?.map((group) => (
                    <TaskGroupItem key={group.id} taskGroup={group}/>
                ))}
            </div>
            <div>
            </div>
        </div>
    );
};

export default TaskGroupList;