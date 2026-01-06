import { useForm } from "react-hook-form";
import useActiveSpace from "../../../state/useActiveSpace";
import Input from "../../../ui/TextInput/Input";
import cl from "./ChangeProfile.module.css"
import Button from "../../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import type { ChangeMemberName } from "../../../types/member";
import useMember from "../../../state/useMember";
import { useModal } from "../../../state/useModal";
import { useLeaveSpace } from "../../../hooks/space/useLeaveSpace";
import useChangeMemberName from "../../../hooks/member/useChangeMemberName";

const ChangeProfile = () => {
    const navig = useNavigate()
    const {closeModal} = useModal()
    const spaceId = useActiveSpace(state => state.spaceId)
    const member = useMember(state => state.member)
    const {register, handleSubmit, formState} = useForm<ChangeMemberName>(
        {
            defaultValues: {
                usernameInSpace: member?.usernameInSpace, 
            }
        }
    )
    
    if (!spaceId) {
        navig("/error")
        return null;
    }
    const {mutate} = useChangeMemberName(spaceId)
    const featching = (obj: ChangeMemberName) => {
        mutate({usernameInSpace: obj.usernameInSpace})
        closeModal()
    }

    const {mutate: leaveSpaceMutate} = useLeaveSpace(spaceId)
    const activeSpaceId = useActiveSpace(state => state.spaceId)

    const leaveFetching = () => {
        if (activeSpaceId == spaceId) {
            navig("/home")
        }
        leaveSpaceMutate()
        closeModal()
    }

    return (
        <div className={cl.modal_container}>
            <form className={cl.form_container} onSubmit={handleSubmit(featching)}>
                <h1 className={cl.modal_title}>Change name in space</h1>
                <Input 
                    className={
                        [
                            cl.modal_input, 
                            formState.errors.usernameInSpace ? cl.error : ""
                        ].join(" ")
                    }
                    {
                        ...register(
                            "usernameInSpace",
                            {
                                minLength: { 
                                    value: 6, message: "min 6 characters" 
                                },
                                maxLength: { 
                                    value: 40, message: "max 40 characters" 
                                },
                            }
                        )
                    }
                />
                <Button type="submit">Edit</Button>
            </form>
            <div className={cl.separator}></div>
            <div className={cl.info_container}>
                <p className={cl.info}>Are you sure you want to leave this space?</p>
                <Button onClick={() => leaveFetching()}>Leave</Button>
            </div>
        </div>
    )
}

export default ChangeProfile;