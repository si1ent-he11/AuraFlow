import { useMemo, useState } from "react";
import type { MemberType } from "../../types/member";
import MemberItem from "../../ui/MemberItem/MemberItem";
import Input from "../../ui/TextInput/Input";
import cl from "./Members.module.css"
import { useModal } from "../../state/useModal";
import useMember from "../../state/useMember";

interface MembersTypeProps {
    members: MemberType[];
}

const MembersList = ({members}: MembersTypeProps) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const openModal = useModal(state => state.openModal)
    const myMember = useMember(state => state.member)
    const filteredData = useMemo(() => {
        if (!Array.isArray(members)) return [];
        
        if (searchValue === "") return members;

        return members.filter(v =>
            v.usernameInSpace.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [members, searchValue]);

    return (
        <div className={cl.list_wrapper}>
            <Input
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)} 
                placeholder="search... 🔍"
            />
            
            {
                members.length == 0 ? <p className={cl.empty_list}>{":)"}</p> : 
                <div>
                    {
                        filteredData.map((value) => 
                            <MemberItem children="setting" key={value.userId} member={value} onClick={
                                () => {
                                    if (myMember?.userId == value.userId) {
                                        openModal("changeProfile", {}) 
                                    } else {
                                        openModal("configuresUser", { member: value }) 
                                    }
                                }
                            } />
                        )
                    }
                </div> 
            }
        </div>
    )
}

export default MembersList;