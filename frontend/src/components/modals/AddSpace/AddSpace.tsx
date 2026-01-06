import { useState } from "react";
import Input from "../../../ui/TextInput/Input";
import cl from "./AddSpace.module.css"
import Button from "../../../ui/Button/Button";
import { useForm } from "react-hook-form";
import type { CreateSpaceDTO } from "../../../types/space";
import type { Invite } from "../../../types/invite";
import { useModal } from "../../../state/useModal";
import { useCreateSpace } from "../../../hooks/space/useCreateSpace";
import useJoinSpace from "../../../hooks/space/useJoinSpace";

const AddSpace = () => {
    const [action, setAction] = useState<"create" | "join">("create")
    const {closeModal} = useModal()
    const {mutate: mutateCreateSpace} = useCreateSpace()
    const {mutate: mutateJoinSpace} = useJoinSpace()

    const {
        register: registerCreateForm, 
        handleSubmit: handleSubmitCreateForm, 
        formState: formStateCreateForm,
    } = useForm<CreateSpaceDTO>()

    const {
        register: registerJoinForm, 
        handleSubmit: handleSubmitJoinForm, 
        formState: formStateJoinForm,
    } = useForm<Invite>()
    
    const featchingCreate = (spaceDTO: CreateSpaceDTO) => {
        try {
            mutateCreateSpace(spaceDTO)
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }

    const featchingJoin = (invite: Invite) => {
        try {
            mutateJoinSpace(invite)
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className={cl.container}>
            <div className={cl.modal_bar}>
                <button 
                    className={
                        [   
                            cl.modal_button,
                            action == "create" ? cl.active_button : ""
                        ].filter(Boolean).join(" ")
                    }

                    onClick={
                        () => setAction("create")
                    }
                >create</button>
                <button 
                    className={
                        [   
                            cl.modal_button,
                            action == "join" ? cl.active_button : ""
                        ].filter(Boolean).join(" ")
                    }

                    onClick={
                        () => setAction("join")
                    }
                >join</button>
            </div>
            {
                action == "create" 
                ?
                <form 
                    className={cl.action_container} 
                    onSubmit={handleSubmitCreateForm(featchingCreate)}
                >
                    <Input 
                        className={
                            [
                                cl.modal_input, 
                                formStateCreateForm.errors.spaceName ? cl.error : ""
                            ].join(" ")
                        }
                        placeholder="spacename..."
                        {
                            ...registerCreateForm(
                                "spaceName", 
                                {
                                    required: "space name is empty",
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
                    <Input 
                        className={
                            [
                                cl.modal_input, 
                                formStateCreateForm.errors.spaceDescription ? cl.error : ""
                            ].join(" ")
                        }
                        placeholder="description (optional)..."
                        
                        {
                            ...registerCreateForm(
                                "spaceDescription",
                                {
                                    minLength: {
                                        value: 6, message: "min 6 characters" 
                                    },
                                    maxLength: { 
                                        value: 255, message: "max 255 characters" 
                                    },
                                }
                            )
                        }
                    />
                    <Input
                        className={                            [
                                cl.modal_input, 
                                formStateCreateForm.errors.usernameInSpace ? cl.error : ""
                            ].join(" ")
                        }
                        placeholder="name in space (optional)..."
                        {
                            ...registerCreateForm(
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
                    <Button type="submit">submit</Button>
                </form>
                :
                <form 
                    className={cl.action_container}
                    onSubmit={handleSubmitJoinForm(featchingJoin)}
                >
                    <Input
                        className={
                            [
                                cl.modal_input, 
                                formStateJoinForm.errors.inviteId ? cl.error : ""
                            ].join(" ")
                        }
                        placeholder="invitation..."
                        {...registerJoinForm(
                            "inviteId", 
                            {
                                required: "invite is empty",
                            }
                        )}
                    />
                    <Input
                        className={
                            [
                                cl.modal_input, 
                                formStateJoinForm.errors.usernameInSpace ? cl.error : ""
                            ].join(" ")
                        }
                        placeholder="name in space (optional)..."
                        {
                            ...registerJoinForm(
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
                    <Button type="submit">submit</Button>
                </form>                    
            }
        </div>
    )
}

export default AddSpace;