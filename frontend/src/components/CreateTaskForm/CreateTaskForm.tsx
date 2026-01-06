import { useForm } from "react-hook-form";
import type { CreateTaskDTO } from "../../types/task";
import { useCreateTask } from "../../hooks/task/useTaskGroup";
import Button from "../../ui/Button/Button";
import Input from "../../ui/TextInput/Input";
import cl from "./CreateTaskForm.module.css"
import { useState } from "react";

interface CreateTaskFormType { 
    taskGroupId: number;
}

const CreateTaskForm = ({taskGroupId}: CreateTaskFormType) => {
    const [isOpen, setIsOpen] = useState(false);
    const {register, handleSubmit, formState, reset} = useForm<CreateTaskDTO>()
    const {mutate} = useCreateTask(taskGroupId)

    const featchingCreateTask = (newTask: CreateTaskDTO) => {
        const dataToSend = { ...newTask }

        if (newTask.expires_at) {
            const days = Number(newTask.expires_at)
            const date = new Date()
            date.setDate(date.getDate() + days)
            dataToSend.expires_at = date.toISOString()
        }   else {
            delete dataToSend.expires_at
        }

        mutate(dataToSend)
        setIsOpen(false)
        reset()
    }

    return (
        <div>
            <div className={cl.accordion_header} onClick={() => setIsOpen(!isOpen)}>
                <h2 className={cl.info}>Add task</h2>
                <span className={`${cl.arrow} ${isOpen ? cl.arrow_up : ""}`}>▼</span>
            </div>
            <div className={`${cl.form_body} ${isOpen ? cl.show : ""}`}>
                <form className={cl.form_container} onSubmit={handleSubmit(featchingCreateTask)}>
                    <Input
                        placeholder="title..."
                        style={
                            formState.errors.title && {color: "#e53935", border: "2px solid #e53935"}
                        }
                        {...register(
                            "title", 
                            {
                                required: "title is required",
                                maxLength: {
                                    value: 100,
                                    message: "title cannot exceed 100 characters"
                                }
                            }
                        )}
                    />
                    <Input
                        className={cl.form_input} 
                        placeholder="description... (optional)"
                        style={
                            formState.errors.description && {color: "#e53935", border: "2px solid #e53935"}
                        }
                        {...register(
                            "description", 
                        )} 
                    />
                    <Input
                        className={cl.form_input}
                        type="number"
                        placeholder="expires at (day)... (opt)"
                        style={
                            formState.errors.expires_at && {color: "#e53935", border: "2px solid #e53935"}
                        }
                        {...register(
                            "expires_at", 
                        )} 
                    />
                    <Button type="submit" disabled={formState.isSubmitting ? true : false}>Submit</Button>
                </form>
            </div>
        </div>
    )

}

export default CreateTaskForm;