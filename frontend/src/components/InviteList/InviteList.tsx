import InviteItem from "../../ui/InviteItem/InviteItem";
import type { InviteDTO } from "../../types/invite";
import cl from "./InviteList.module.css"

interface InviteListType {
    invites: InviteDTO[] | undefined;
    className?: string;
} 

const InviteList = ({invites, className}: InviteListType) => {
    return (
        <div className={className}>
            {
                !invites?.length 
                ? <p className={cl.empty_list}>{":)"}</p>
                : (invites.map(inv => <InviteItem key={inv.id} invite={inv} />))
            }
        </div>
    )
}

export default InviteList;