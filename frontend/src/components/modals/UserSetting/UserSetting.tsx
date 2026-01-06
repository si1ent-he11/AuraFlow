import { useForm } from "react-hook-form";
import useUserStore from "../../../state/useUser";
import Button from "../../../ui/Button/Button";
import cl from "./UserSetting.module.css"
import Input from "../../../ui/TextInput/Input";
import type { UserDTO } from "../../../types/user";
import { useLogout } from "../../../state/useLogout";
import { useModal } from "../../../state/useModal";
import { useUpdateUser } from "../../../hooks/user/useUpdateUser";

const UserSetting = () => {
    const logout = useUserStore(state => state.logout);
    const user = useUserStore(state => state.user);
    const {register, handleSubmit, formState} = useForm<UserDTO>({
        defaultValues: {
            email: user?.email,
            username: user?.username
        }
    })

    const {mutate: mutateLogout} = useLogout()
    const {mutate: mutateUpdateUser} = useUpdateUser()
    const {closeModal} = useModal()
    
    const fetching = (obj: UserDTO) => {
        mutateUpdateUser(obj)
        closeModal()
    }

    const leaveFetching = () => {
        mutateLogout()
        logout()
        closeModal()
    }

    return (
        <div className={cl.container}>
            <form className={cl.form_container} onSubmit={handleSubmit(fetching)}>
                <h1 className={cl.title}>Change profile</h1>
                <Input
                    className={
                        [
                            cl.modal_input, 
                            formState.errors.email ? cl.error : ""
                        ].join(" ")
                    }
                    {
                        ...register(
                            "email",
                            { 
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "invalid email address"
                                }
                            },
                        )
                    }
                />
                <Input 
                    className={
                        [
                            cl.modal_input, 
                            formState.errors.username ? cl.error : ""
                        ].join(" ")
                    }
                    {
                        ...register(
                            "username",
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
                <p className={cl.info}>Are you sure you want to log out of your account?</p>
                <Button onClick={() => leaveFetching()}>Logout</Button>
            </div>
        </div>
    )
}

export default UserSetting;