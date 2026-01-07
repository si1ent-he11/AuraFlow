import useActiveSpace from "../../state/useActiveSpace";
import cl from "./TasksGroupsList.module.css"
import { useTasksGroups } from "../../hooks/task/useTaskGroup";
import Loader from "../../ui/Loader/Loader";
import { useModal } from "../../state/useModal";
import useMember from "../../state/useMember";
import TaskGroupItem from "../../ui/TaskGroupItem /TaskGroupItem";
import { useMemo, useState } from "react";
import Input from "../../ui/TextInput/Input";
import useGetMemberByMemberId from "../../hooks/member/useGetMemberByMemberId";

const TaskGroupList = () => {
    const spaceId = useActiveSpace(state => state.spaceId);
    const { data: groups, isLoading } = useTasksGroups(spaceId);
    const openModal = useModal(state => state.openModal)
    const [searchValue, setSearchValue] = useState<string>("")
    
    const member = useMember(state => state.member)
    const memberId = member?.id ?? null;

    const {data: currentMemberSetting} = useGetMemberByMemberId(memberId, spaceId)
    console.log(currentMemberSetting)

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
                    <TaskGroupItem currentUserRole={currentMemberSetting?.spaceRole} key={group.id} taskGroup={group}/>
                ))}
            </div>
        </div>
    );
};

export default TaskGroupList;