import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import Input from "../../ui/TextInput/Input";
import cl from "./SignInForm.module.css"
import type { UserLoginRequestDTO } from "../../types/user";
import { useNavigate } from "react-router-dom";
import useSignIn from "../../hooks/auth/useSignIn";
import useUserStore from "../../state/useUser";

const SignInForm = () => {
    const {register, handleSubmit, formState} = useForm<UserLoginRequestDTO>()    
    const {mutateAsync} = useSignIn()
    const navigate = useNavigate()

    const setAccessToken = useUserStore((state) => state.setAccessToken)
    const fetching = async (userDTO: UserLoginRequestDTO) => {
        try {
            const auth = await mutateAsync(userDTO)
            setAccessToken(auth.accessToken)
            navigate("/home")
        } catch (error) {
            navigate("/error", {replace: true});
        }
    }

    return (
        <form className={cl.form_container} onSubmit={handleSubmit(fetching)}>
            <Input
                className={cl.form_input} 
                placeholder="email..."
                style={
                    formState.errors.email && {color: "#e53935", border: "2px solid #e53935"}
                } 
                {...register(
                    "email", 
                    {
                        required:"email is empty",     
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "invalid email address"
                        }
                    },
                )}
            />
            <Input 
                className={cl.form_input} 
                placeholder="password..."
                style={
                    formState.errors.password && {color: "#e53935", border: "2px solid #e53935"}
                } 
                {...register(
                "password", 
                {
                    required:"password is empty",
                    minLength: { 
                        value: 6, message: "minimum 6 characters" 
                    },
                    maxLength: { 
                        value: 40, message: "max 40 characters" 
                    },
                    pattern: {
                        value: /^(?=.*\d).{8,}$/,
                        message: "password must be at least 8 characters and contain a number"
                    }
                }
            )} />
            <Button type="submit" disabled={formState.isSubmitting}> 
                Submit 
            </Button>
        </form>
    );
}

export default SignInForm;