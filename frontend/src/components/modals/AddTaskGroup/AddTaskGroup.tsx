import { useForm } from "react-hook-form";
import type { TaskGroupDTO } from "../../../types/task";
import Input from "../../../ui/TextInput/Input";
import cl from "./AddTaskGroup.module.css"
import Button from "../../../ui/Button/Button";
import { useCreateTaskGroup } from "../../../hooks/task/useTaskGroup";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../state/useModal";

export interface AddTaskGroupType {
    spaceID: number | null,
    createdByMemberId: number | null;
}

const AddTaskGroup = ({spaceID, createdByMemberId}: AddTaskGroupType) => {
    const {register, handleSubmit, formState} = useForm<TaskGroupDTO>()
    const closeModal = useModal(state => state.closeModal)
    const {mutate} = useCreateTaskGroup()
    const navig = useNavigate()
    
    if (!spaceID || !createdByMemberId) {
        navig("/error")
        return
    }

    const featchingCreate = (taskGroup: TaskGroupDTO) => {
        mutate({
            space_id: spaceID,
            created_by: createdByMemberId,
            task_group_name: taskGroup.task_group_name,
            min_score: taskGroup.min_score,
            max_score: taskGroup.max_score,
        })
        closeModal()
    }

    return (
        <form 
            className={cl.action_container} 
            onSubmit={handleSubmit(featchingCreate)}
        >
            <h1 className={cl.title}>Add task group</h1>            
            <Input
                className={
                    [
                        cl.modal_input, 
                        formState.errors.task_group_name ? cl.error : ""
                    ].join(" ")
                }
                placeholder="tasks group name..."
                {
                    ...register(
                        "task_group_name", 
                        {
                            required: "task group name is empty",
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
                        formState.errors.min_score ? cl.error : ""
                    ].join(" ")
                }
                type="number"
                placeholder="min_score..."
                {
                    ...register(
                        "min_score",
                        {
                            valueAsNumber: true,
                            required: "min score is required",
                            min: { value: 0, message: "min score for min_score must be >= 0" },
                            max: { value: 100, message: "max score for min_score must be <= 100" },
                        }
                    )
                }
            />
            <Input
                className={                            [
                        cl.modal_input, 
                        formState.errors.max_score ? cl.error : ""
                    ].join(" ")
                }
                type="number"
                placeholder="max_score..."
                {
                    ...register(
                        "max_score",
                        {
                            valueAsNumber: true,
                            required: "max score is required",
                            min: { value: 1, message: "min score for max_score is 1" },
                            max: { value: 100, message: "max score for max_score must be <= 100" },
                            validate: (value, formValues) => {
                                if (value <= formValues.min_score) {
                                    return "max score must be greater than min score"
                                }
                                return true
                            }
                        }
                    )
                }
            />
            <Button type="submit">submit</Button>
        </form>
    )
}

export default AddTaskGroup;