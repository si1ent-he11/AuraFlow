import cl from "./InviteItem.module.css"
import { type InviteDTO } from "../../types/invite"
import Button from "../Button/Button"
import useDeleteInvite from "../../hooks/invite/useDeleteInvite"

interface InviteItemType {
    invite: InviteDTO
}

const getLocalDate = (utc?: string) => {
    if (!utc) return ""
    const date = new Date(utc)
    return date.toLocaleString()
}

const InviteItem = ({invite}: InviteItemType) => {
    const {mutate} = useDeleteInvite()
    return (
        <div className={cl.container}>
            <div className={cl.container}>
                <h1 className={cl.title}>{invite.id}</h1>
                <h3 className={cl.info}>expires at {getLocalDate(invite.expiresAt!)}</h3>
            </div>
            <Button onClick={() => {
                mutate({inviteId: invite.id})
            }}>Delete</Button>
        </div>
    )
}

export default InviteItem;