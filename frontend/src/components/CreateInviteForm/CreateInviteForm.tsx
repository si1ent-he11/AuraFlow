import { useForm } from "react-hook-form";
import type { createInviteForm } from "../../types/invite";
import Button from "../../ui/Button/Button";
import cl from "./CreateInviteForm.module.css";
import Input from "../../ui/TextInput/Input";
import useCreateInvite from "../../hooks/invite/useCreateInvite";

interface CreateInviteType {
    spaceId: number;
}

const CreateInviteForm = ({spaceId}: CreateInviteType) => {
    const {register, handleSubmit, formState, reset} = useForm<createInviteForm>()
    const {mutate} = useCreateInvite(spaceId)
    const create = (obj: createInviteForm) => {
        mutate(
            {
                hoursToExpire: obj.hoursToExpire,
                maxUses: obj.maxUses,
            }
        )
        reset()
    }
    
    return (
        <form className={cl.form_container} onSubmit={handleSubmit(create)}>
            <Input
                type="number"
                className={cl.form_input} 
                placeholder="hours to expire..."
                style={
                    formState.errors.hoursToExpire && {color: "#e53935", border: "2px solid #e53935"}
                }
                {...register(
                    "hoursToExpire", 
                    {
                        required: "hoursToExpire is empty",
                        valueAsNumber: true,
                        min: { 
                            value: 1, 
                            message: "minimum 1 hour" 
                        },
                        max: { 
                            value: 8760,
                            message: "too many hours" 
                        },
                        validate: (value) => !isNaN(value) || "must be a number"
                    }
                )} 
            />
            <Input
                type="number"
                className={cl.form_input} 
                placeholder="max uses..."
                style={
                    formState.errors.maxUses && {color: "#e53935", border: "2px solid #e53935"}
                        }
                {...register(
                    "maxUses", 
                    {
                        required: "max uses is required",
                        valueAsNumber: true,
                        min: { 
                            value: 1, 
                            message: "must be at least 1 use" 
                        },
                        max: { 
                            value: 10000,
                            message: "max uses is too high" 
                        },
                        validate: (value) => Number.isInteger(value) || "must be a whole number"
                    }
                )}
            />
            <Button type="submit" disabled={formState.isSubmitting ? true : false}>Submit</Button>
        </form>
    )
}

export default CreateInviteForm;