import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import Input from "../../ui/TextInput/Input";
import cl from "./SignUpForm.module.css"

interface FormType {
    username: string;
    email: string;
    password: string;
}

const SignUpForm = () => {
    const {register, handleSubmit, reset, formState} = useForm<FormType>()

    const fetching = (obj: FormType) => {
        console.log(obj)
        reset()
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
                        required:"name is empty",     
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "invalid email address"
                        }
                    }, 
                )} 
            />
            <Input
                className={cl.form_input} 
                placeholder="username..."
                style={
                    formState.errors.username && {color: "#e53935", border: "2px solid #e53935"}
                }
                {...register(
                    "username", 
                    {
                        required:"username is empty",
                        minLength: { 
                            value: 6, message: "min 6 characters" 
                        },
                        maxLength: { 
                            value: 40, message: "max 40 characters" 
                        },
                    }
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
                        value: 6, message: "minimum 8 characters" 
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
            <Button type="submit" disabled={formState.isSubmitting ? true : false} style={{}}>Submit</Button>
        </form>
    );
}

export default SignUpForm;